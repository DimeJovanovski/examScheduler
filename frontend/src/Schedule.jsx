import React, { useState, useEffect } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { fetchRoomNames, fetchExams, deleteExam } from './api/api';
import { getColorByStudyCycle } from './utils/studyCycleColors';
import { Modal } from "@daypilot/modal";

const Schedule = ({ startDate, onEventsChange }) => {
  const [columns, setColumns] = useState([]); // For room names
  const [events, setEvents] = useState([]);   // For exams

  // Function to format the date-time for input fields
  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Ensure 2 digits
    const day = (`0${date.getDate()}`).slice(-2); // Ensure 2 digits
    const hours = (`0${date.getHours()}`).slice(-2); // Ensure 2 digits
    const minutes = (`0${date.getMinutes()}`).slice(-2); // Ensure 2 digits
    const seconds = (`0${date.getSeconds()}`).slice(-2); // Ensure 2 digits
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`; // Full ISO format
  };
  

  const openEditForm = async (event) => {
    console.log("Event rooms: ", event.rooms); // Debugging the rooms
  
    // Create the form configuration with checkboxes for each room
    const form = [
      { type: 'title', name: `${event.text} (${event.subjectAbbreviation})` },
      { 
        type: 'datetime', 
        id: 'fromTime', 
        name: 'Од', 
        dateFormat: 'yyyy-MM-dd', 
        timeFormat: 'HH:mm', 
        value: formatTime(event.start)
      },
      { 
        type: 'datetime', 
        id: 'toTime', 
        name: 'До', 
        dateFormat: 'yyyy-MM-dd', 
        timeFormat: 'HH:mm', 
        value: formatTime(event.end)
      },
      ...columns.map((room) => ({
        type: 'checkbox',
        id: room.id, // Unique ID for the checkbox
        name: room.name // Display name for the checkbox
      }))
    ];
  
    // Create a data object to pre-check the checkboxes
    const data = columns.reduce((acc, room) => {
      acc[room.id] = event.rooms.split(', ').includes(room.name.trim()); // Pre-check based on room names
      return acc;
    }, {
      fromTime: event.start,
      toTime: event.end,
      subjectName: event.text,
      subjectId: event.id
    });
  
    // Open the modal with the form and pre-filled data
    const modal = await DayPilot.Modal.form(form, data);
    if (!modal.canceled) {
      const updatedData = modal.result;
      console.log('Updated exam data:', updatedData);
    }
  };
  
  

  // Configuration for the DayPilot Calendar
  const config = {
    viewType: "Resources",
    cellWidth: 300,  // Set a fixed width for the columns
    eventHeight: 30, // Height of the events
    showEventTime: true,
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Уреди",
          onClick: (args) => {
            openEditForm(args.source.data);
          }
        },
        {
          text: "Избриши",
          onClick: async (args) => {
            const eventId = args.source.data.id; // Ensure you are accessing the event ID correctly
            try {
              await deleteExam(eventId);
              console.log(`Exam with ID ${eventId} deleted successfully.`);

              // Remove the event from the events array
              setEvents((prevEvents) => {
                const updatedEvents = prevEvents.filter(event => event.id !== eventId);
                if (onEventsChange) {
                  onEventsChange(updatedEvents); // Notify the parent component with updated events
                }
                return updatedEvents;
              });
            } catch (error) {
              console.error(`Failed to delete exam with ID ${eventId}: `, error);
            }
          }
        }
      ]
    }),
    onEventClick: (args) => {
      const event = args.e.data;
      function formatDateTime(dateTime) {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = (`0${date.getMonth() + 1}`).slice(-2);
        const day = (`0${date.getDate()}`).slice(-2);
        const hours = (`0${date.getHours()}`).slice(-2);
        const minutes = (`0${date.getMinutes()}`).slice(-2);
        return `${hours}:${minutes}h    ${day}.${month}.${year}`;
      }

      DayPilot.Modal.alert(`
        <b>Предмет:</b> ${event.text} (${event.subjectAbbreviation})<br>
        <b>Од:</b> ${formatDateTime(event.start)}<br>
        <b>До:</b> ${formatDateTime(event.end)}<br>
        <b>Простории:</b> ${event.rooms}
      `);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    Promise.all([fetchRoomNames(), fetchExams()])
      .then(([roomsResponse, examsResponse]) => {
        // Set room names to columns
        const roomColumns = roomsResponse.data.map((room, index) => ({
          name: room.name,
          id: `R${index + 1}` // Generate unique IDs for rooms
        }));
        setColumns(roomColumns);

        // Set exams to events, handling multiple rooms
        const examEvents = examsResponse.data.flatMap((exam) => {
          const rooms = `${exam.roomNames}`.replace(/,/g, ", ");
          return exam.roomNames.map((roomName) => ({
            id: `${exam.id}`, // Unique ID for each exam-room combination
            text: `${exam.subjectName}`, // The exam name or id
            subjectAbbreviation: exam.subjectAbbreviation,
            start: exam.fromTime, // Exam start time
            end: exam.toTime, // Exam end time
            rooms: rooms,
            barColor: getColorByStudyCycle(exam.studyCycle), // Color for the event bar
            moveVDisabled: true,
            moveHDisabled: false,
            resource: `R${roomColumns.findIndex(col => col.name === roomName) + 1}` // Match room name with resource ID
          }));
        });
        setEvents(examEvents);

        // Notify the parent component about the events
        if (onEventsChange) {
          onEventsChange(examEvents);
        }
      })
      .catch(error => {
        console.error("Error fetching data from the API", error);
      });
  }, [onEventsChange]);

  return (
    <div style={{ overflowX: 'auto' }}>
      <DayPilotCalendar
        {...config}
        timeFormat='Clock24Hours'
        startDate={startDate}
        columns={columns}
        events={events}
        eventMoveHandling='true'
        cellWidth={200}
      />
    </div>
  );
}

export default Schedule;
import React, { useState, useEffect } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { fetchRoomNames, fetchExams } from './api/api';
import { getColorByStudyCycle } from './utils/studyCycleColors';

const Schedule = ({ startDate, onEventsChange }) => {
  const [config, setConfig] = useState({
    viewType: "Resources",
    cellWidth: 300,  // Set a fixed width for the columns
    eventHeight: 30, // Height of the events
    showEventTime: true
  });

  const [columns, setColumns] = useState([]); // For room names
  const [events, setEvents] = useState([]);   // For exams

  useEffect(() => {
    // Fetch room names and exam data in parallel using the functions from api.js
    Promise.all([fetchRoomNames(), fetchExams()])
      .then(([roomsResponse, examsResponse]) => {
        // Set room names to columns
        const roomColumns = roomsResponse.data.map((room, index) => ({
          name: room.name,
          id: `R${index + 1}`  // Generate unique IDs for rooms
        }));
        setColumns(roomColumns);

        // Set exams to events, handling multiple rooms
        const examEvents = examsResponse.data.flatMap((exam, index) => {
          return exam.roomNames.map((roomName) => ({
            id: `${exam.id}-${roomName}`,  // Unique ID for each exam-room combination
            text: `${exam.id}`,  // The exam name or id
            start: exam.fromTime,  // Exam start time
            end: exam.toTime,  // Exam end time
            barColor: getColorByStudyCycle(exam.studyCycle),  // Color for the event bar
            moveVDisabled: true,
            moveHDisabled: false,
            resource: `R${roomColumns.findIndex(col => col.name === roomName) + 1}`  // Match room name with resource ID
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
    <div style={{ overflowX: 'auto' }}> {/* Enable horizontal scrolling */}
      <DayPilotCalendar
        {...config}
        timeFormat='Clock24Hours'
        startDate={startDate}
        columns={columns}
        events={events}
        eventMoveHandling='true'
        cellWidth={200}  // Ensure each column has a fixed width of 200px
      />
    </div>
  );
}

export default Schedule;

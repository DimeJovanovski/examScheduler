import { useState, useEffect } from 'react';
import './App.css';
import Schedule from './Schedule';
import Calendar from './Calendar';
import { DayPilot } from '@daypilot/daypilot-lite-react';
import { fetchDataForExamDialog, addExam } from './api/api';  // Import addExam here
import headerLogo from './assets/finki_mk.png';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [examDialogData, setExamDialogData] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);

  // Fetch data for the modal dialog when the component loads
  useEffect(() => {
    fetchDataForExamDialog()
      .then(response => {
        setExamDialogData(response.data);
      })
      .catch(error => {
        console.error("Error fetching exam dialog data:", error);
      });
  }, []);

  // Open the modal dialog with searchable dropdowns and checkboxes for rooms
  const openModalDialog = async () => {
    if (!examDialogData) {
      alert("Loading exam dialog data, please wait...");
      return;
    }
  
    // Define the form for the modal dialog
    const form = [
      { type: 'title', name: "Внеси термин" },
      {
        name: "Предмет",
        id: "subjectId",
        type: "searchable",
        options: examDialogData.subjects.map(subject => ({
          id: subject.id,
          name: `${subject.name} (${subject.abbreviation})`
        }))
      },
      {
        name: "Сесија",
        id: "sessionId",
        type: "searchable",
        options: examDialogData.sessions.map(session => ({
          id: session,
          name: session
        }))
      },
      {
        name: "Од",
        id: "fromTime",
        type: "datetime",
        dateFormat: 'yyyy-MM-dd',
        timeFormat: 'HH:mm',
      },
      {
        name: "До",
        id: "toTime",
        type: "datetime",
        dateFormat: 'yyyy-MM-dd',
        timeFormat: 'HH:mm',
      },
      {
        name: "Коментар",
        id: "comment",
        type: "text"
      },
      // Map room checkboxes
      ...examDialogData.rooms.map(room => ({
        type: 'checkbox',
        id: room,  // Using the room string as the checkbox id
        name: room  // Display the room string
      }))
    ];
  
    // Initialize default data for the form, setting all checkboxes to false
    const data = {
      subjectId: "",
      sessionId: "",
      fromTime: DayPilot.Date.today(),
      toTime: DayPilot.Date.today().addHours(1),
      comment: "",
      // Initialize room checkboxes as unchecked
      ...examDialogData.rooms.reduce((acc, room) => {
        acc[room] = false;  // Unchecked by default
        return acc;
      }, {})
    };
  
    // Open the modal dialog
    const modal = await DayPilot.Modal.form(form, data);
  
    if (!modal.canceled) {
      const { subjectId, sessionId, fromTime, toTime, comment } = modal.result;
  
      // Collect selected rooms (those checkboxes that are checked)
      const selectedRooms = examDialogData.rooms
        .filter(room => modal.result[room] === true)  // Only rooms where the checkbox is checked
        .map(room => room);  // Keep the room strings as is
  
      // Prepare the data to send to the API
      const examData = {
        subjectId,
        sessionId,
        fromTime,
        toTime,
        comment,
        roomNames: selectedRooms  // Send the selected room strings
      };
  
      // Call the API to add the exam
      addExam(examData)
        .then(() => {
          console.log("Exam added successfully.");
        })
        .catch((error) => {
          console.error("Error adding exam:", error);
        });
    }
  };
  
   

  return (
    <div className="container">
      <div className="dpw-header">
        <div className="dpw-header-inner" style={{ textAlign: "start", margin: "0px", padding: "0px" }}>
          <img src={headerLogo} style={{ height: "50px", padding: "5px 0 0 20px", margin: "0px" }} alt="FINKI logo" />
        </div>
      </div>
      <div className="content-container">
        <div className="calendar-wrapper">
          <Calendar onDateSelect={setStartDate} events={events} />
        </div>
        <br/>
        <div className="schedule-wrapper" style={{ overflowX: 'auto', textAlign: 'start' }}> {/* Ensure this container can scroll horizontally */}
          <button onClick={openModalDialog} style={{ marginBottom: '10px' }}>
            Add Exam
          </button>
          <Schedule
            startDate={startDate}
            onEventsChange={setEvents} // Pass events to Calendar
          />
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';
import Schedule from './Schedule';
import Calendar from './Calendar';
import { DayPilot } from '@daypilot/daypilot-lite-react';
import { fetchDataForExamDialog, addExam } from './api/api';
import headerLogo from './assets/finki_mk.png';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [examDialogData, setExamDialogData] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    fetchDataForExamDialog()
      .then(response => {
        setExamDialogData(response.data);
      })
      .catch(error => {
        console.error("Error fetching exam dialog data:", error);
      });
  }, []);

  const openModalDialog = async () => {
    if (!examDialogData) {
      alert("Loading exam dialog data, please wait...");
      return;
    }

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
      ...examDialogData.rooms.map(room => ({
        type: 'checkbox',
        id: room,
        name: room
      }))
    ];

    const data = {
      subjectId: "",
      sessionId: "",
      fromTime: DayPilot.Date.today(),
      toTime: DayPilot.Date.today().addHours(1),
      comment: "",
      ...examDialogData.rooms.reduce((acc, room) => {
        acc[room] = false;
        return acc;
      }, {})
    };

    const modal = await DayPilot.Modal.form(form, data);

    if (!modal.canceled) {
      const { subjectId, sessionId, fromTime, toTime, comment } = modal.result;
      console.log("modal.result: ", modal.result);

      // Normalize the room selection from modal.result
      const roomNames = [];

      for (const [key, value] of Object.entries(modal.result)) {
        if (typeof value === 'boolean' && value) {
          roomNames.push(key); // Add the exact room key without trimming
        } else if (typeof value === 'object' && value !== null) {
          // Handle nested objects
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            if (nestedValue) {
              roomNames.push(`${key}.${nestedKey}`);
            }
          }
        }
      }

      console.log("Room names: ", roomNames);



      const requestBody = {
        subjectId,
        sessionId,
        fromTime,
        toTime,
        comment,
        roomNames  // Send the selected room strings
      };

      addExam(requestBody)
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
        <br />
        <div className="schedule-wrapper" style={{ overflowX: 'auto', textAlign: 'start' }}>
          <button onClick={openModalDialog} style={{ marginBottom: '10px' }}>
            Додади испит
          </button>
          <Schedule
            startDate={startDate}
            onEventsChange={setEvents}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

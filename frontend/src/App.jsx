import { useState } from 'react';
import './App.css';
import Schedule from './Schedule';
import Calendar from './Calendar';
import headerLogo from './assets/finki_mk.png';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  return (
    <div className="App">
      <div className="dpw-header">
        <div className="dpw-header-inner" style={{ textAlign: "start", margin: "0px", padding: "0px" }}>
          <img src={headerLogo} style={{ height: "50px", padding: "5px 0 0 20px", margin: "0px" }} alt="FINKI logo" />
        </div>
      </div>

      <div className="content-container">
        <div className="calendar-wrapper">
          <Calendar onDateSelect={setStartDate} events={events} />
        </div>
        <div className="schedule-wrapper" style={{ overflowX: 'auto' }}> {/* Ensure this container can scroll horizontally */}
          <div className="schedule-container">
            <Schedule
              startDate={startDate}
              onEventsChange={setEvents} // Pass events to Calendar
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
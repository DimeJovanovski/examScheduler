import { useState } from 'react';
import './App.css';
import Schedule from './Schedule';
import Calendar from './Calendar';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  return (
    <div className="App">
      <Calendar onDateSelect={setStartDate} events={events} />
      <Schedule
        startDate={startDate}
        onEventsChange={setEvents} // Pass events to Calendar
      />
    </div>
  );
}

export default App;
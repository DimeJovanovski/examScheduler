import { useState } from 'react';
import './App.css';
import Schedule from './Schedule';
import Calendar from './Calendar';

function App() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="App">
      <Calendar onDateSelect={setStartDate} />
      <Schedule startDate={startDate} />
    </div>
  );
}

export default App;

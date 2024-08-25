import React, { useState, useEffect } from 'react';
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const Schedule = ({ startDate }) => {
  const [config, setConfig] = useState({
    viewType: "Resources",
  });

  const [columns, setColumns] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setColumns([
      { name: "Room 1", id: "R1" },
      { name: "Room 2", id: "R2" },
      { name: "Room 3", id: "R3" },
      { name: "Room 4", id: "R4" },
      { name: "Room 5", id: "R5" },
      { name: "Room 6", id: "R6" },
    ]);

    setEvents([
      {
        id: 1,
        text: "Event 1",
        start: "2024-08-25T11:00:00",
        end: "2024-08-25T13:30:00",
        barColor: "#fcb711",
        resource: "R1"
      },
      {
        id: 2,
        text: "Event 2",
        start: "2024-08-25T11:00:00",
        end: "2024-08-25T14:30:00",
        barColor: "#f37021",
        resource: "R2"
      },
      {
        id: 3,
        text: "Event 3",
        start: "2024-08-26T11:00:00",
        end: "2024-08-26T14:30:00",
        barColor: "#f37021",
        resource: "R5"
      },
      {
        id: 4,
        text: "Event 4",
        start: "2024-08-27T11:00:00",
        end: "2024-08-27T14:30:00",
        barColor: "#f37021",
        resource: "R4"
      }
    ]);
  }, []);

  return (
    <DayPilotCalendar
      {...config}
      startDate={startDate}
      columns={columns}
      events={events}
    />
  );
}

export default Schedule;

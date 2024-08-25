import React, { Component } from 'react';
import { DayPilot, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      busyDays: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      this.updateBusyDays();
    }
  }

  updateBusyDays() {
    const { events } = this.props;
    const busyDays = Array.from(new Set(events.map(event => {
      const date = new Date(event.start);
      const formattedDate = date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
      return formattedDate;
    })));

    this.setState({
      busyDays: busyDays.map(day => ({
        start: day,
        end: day,
        color: "#d3d3d3" // Light grey color for busy days
      }))
    });
  }

  handleDateSelection = (args) => {
    this.setState({
      startDate: args.day
    });
    // Notify parent component
    if (this.props.onDateSelect) {
      this.props.onDateSelect(args.day);
    }
  }

  render() {
    return (
      <DayPilotNavigator
        selectMode={"Day"}
        showMonths={1}
        skipMonths={1}
        onTimeRangeSelected={this.handleDateSelection}
        events={this.state.busyDays}
      />
    );
  }
}

export default Calendar;

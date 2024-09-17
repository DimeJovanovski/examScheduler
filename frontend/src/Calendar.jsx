import React, { Component } from 'react';
import { DayPilotNavigator } from "@daypilot/daypilot-lite-react";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      busyDays: [],
      key: 0  // Add a key to force re-render
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.events !== this.props.events) {
      // When events change, recalculate busy days and force a refresh
      this.updateBusyDays();
    }
  }

  updateBusyDays() {
    const { events } = this.props;

    // Get unique busy days from events
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
      })),
      key: this.state.key + 1  // Increment the key to force re-render
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
        key={this.state.key}  // Use the key to trigger full re-render
        selectMode={"Day"}
        showMonths={1}
        skipMonths={1}
        onTimeRangeSelected={this.handleDateSelection}
        events={this.state.busyDays}  // These are the bolded/busy days
      />
    );
  }
}

export default Calendar;

import React, { Component } from 'react';
import { DayPilot, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null
    };
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
      />
    );
  }
}

export default Calendar;
import React, { Component } from 'react';
import { connect } from 'react-redux';


class workoutItem extends Component {
  state = {
    set: 0
  }
  handleChange = (propertyName, event) => {
    this.setState({
      [propertyName] : event.target.value
    })
  }
  render() {
    return (
      <div>

      <MenuItem value={this.props.name}>{this.props.name}</MenuItem>
      <TextField
        type="Number"
        required
        placeholder="Sets"
        label="Sets"
        onChange={(event) => this.handleChange('set', event)}
      >
      </TextField>
      </div>
    )
  }
}

export default ExerciseItem;
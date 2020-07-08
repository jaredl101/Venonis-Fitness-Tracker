import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
// hmm 
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));


  class AddExercise extends Component {
    state = {
      newExercise: {
        name: '',
      }
    };

    handleChange = event => {
      this.setState({
        newExercise: {
          ...this.state.newExercise,
          name: event.target.value,
        }
      })
    }
   
    render() {
      return (
        <div>
          <FormControl className='Form'>
            <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.state.newExercise.name}
              onChange={this.handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>

        </div>
      )
    }
  }


export default AddExercise;
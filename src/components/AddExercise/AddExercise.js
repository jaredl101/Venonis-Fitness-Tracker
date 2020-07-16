import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddExercise.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from '@material-ui/core';

const useStyles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
});

class AddExercise extends Component {
  state = {
    name: 'arnold_press',
    // newExercise: {
    //   name: 'default',
    // },
    sets: [ {weight: '', rep: ''}]
  };

  handleChange = (propertyName, event) => {
    console.log(`Event.target.value is: ${event.target.value}`)
    this.setState({
      //newExercise: {
        
        [propertyName]: event.target.value
      
    })
  }
  //
  handleMasterChange = (event) => {
    // This is a function to keep track of all the sets we are adding
    if (["weight", "rep"].includes(event.target.className)) {
      let sets = [...this.state.sets]
      sets[event.target.dataset.id][event.target.className] = event.target.value
      this.setState({ sets }, () => console.log(this.state.sets))
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  addSet = (event) => {
    // This makes it so if the user presses add set it will change the state of sets, therefore our
    // component will rerender as state has changed. 
    this.setState((prevState) => ({
      sets: [...prevState.sets, {weight:'', rep:''}],
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let item = { name: this.state.name, currentExerciseId: '', currentWorkoutId: '', currentExerciseInstanceId: '', sets: this.state.sets, userId: this.props.user.id }
    //console.log('In AddExercise.js item.instanceid is: ', item.currentExerciseInstanceId)
    this.props.dispatch({ type: 'FETCH_EXERCISE_ID', payload: item })
  }

  render() {
    const { classes } = this.props;
    let {sets} = this.state;
    return (
      <div>
        <FormControl className={classes.formControl} >

          <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.name}
            onChange={(event) => this.handleChange('name', event)}
            //onSubmit={(event) => this.setExerciseId}
          >
            
            {this.props.exercise.length === 0 ? <MenuItem value="arnold_press">arnold_press</MenuItem> :
              this.props.exercise.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.exercise_name}>{item.exercise_name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" size="small" onClick={this.addSet}>Add new set</Button>
        <form onSubmit={this.handleSubmit} onChange={this.handleMasterChange} >
            {
              sets.map((val, index) => {
                let setId = `set-${index}`, weightId = `weight-${index}`, repId = `rep-${index}`
                return (
                  <div key={index}>
                    <label htmlFor={setId}>{` set #${index+1}`}</label>
                    <input
                    type="text"
                    name={setId}
                    data-id={index}
                    id={setId}
                   
                    className="set"
                    value={index+1}
                    disabled
                    />
                    <label htmlFor={weightId}></label>
                    {/* The way I have these written they fail with TextField :( */}
                    <input 
                    placeholder="Weight(lbs)"
                    type="text"
                    name={weightId}
                    data-id={index}
                    id={weightId}
                    className="weight"
                    />
                    <label htmlFor={repId}></label> 
                    <input
                    placeholder="Reps"
                    type="text"
                    name={repId}
                    data-id={index}
                    id={repId}
                    className="rep"
                    />

                  </div>
                )
              })
            }
          <input type="submit" value="Submit" />          
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    exercise: state.exercise,
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AddExercise))


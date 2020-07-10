import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
// hmm 
import './AddExercise.css';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ExerciseItem from '../ExerciseItem/ExerciseItem'
import { withStyles } from "@material-ui/core/styles";

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
    // currentWorkoutId: '',
    // currentExerciseId: '',
    newExercise: {
      name: 'default',
    },
    sets: [ {weight: '', rep: ''}]
    
  };

  

  handleChange = (propertyName, event) => {
    console.log(`Event.target.value is: ${event.target.value}`)
    this.setState({
      newExercise: {
        [propertyName]: event.target.value
      }
    })
  }
  //
  handleMasterChange = (event) => {
    if (["weight", "rep"].includes(event.target.className)) {
      let sets = [...this.state.sets]
      sets[event.target.dataset.id][event.target.className] = event.target.value
      this.setState({ sets }, () => console.log(this.state.sets))
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  addSet = (event) => {
    this.setState((prevState) => ({
      sets: [...prevState.sets, {weight:'', rep:''}],
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  setExerciseId = (event) => {
    this.props.dispatch({ type: 'FETCH_EXERCISE_ID', payload: this.state.newExercise.name})
    
  }

  render() {
    const { classes } = this.props;
    console.log('test ' + this.state.newExercise.name);
    let {sets} = this.state;

    return (
      <div>
        <FormControl className={classes.formControl} >

          <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.newExercise.name}
            onChange={(event) => this.handleChange('name', event)}
            onSubmit={(event) => this.setExerciseId}
          >
            
            {this.props.exercise.length === 0 ? <MenuItem value="default">default</MenuItem> :
              this.props.exercise.map((item, index) => {
                return (
                  <MenuItem value={item.exercise_name}>{item.exercise_name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        <button onClick={this.setExerciseId}>hey</button>
        <form onSubmit={this.handleSubmit} onChange={this.handleMasterChange} >
          <label htmlFor="owner">Owner</label>
          <input type="text" name="owner" id="owner" />
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" />
          <button onClick={this.addSet}>Add new set</button>
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
                    />
                    <label htmlFor={weightId}>weight</label>
                    <input 
                    type="text"
                    name={weightId}
                    data-id={index}
                    id={weightId}
                    className="weight"
                    />
                    <label htmlFor={repId}>reps</label>
                    <input
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
    exercise: state.exercise,
    current: state.current
  }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AddExercise))


// <MenuItem value={10}>Ten</MenuItem>
// <MenuItem value={20}>Twenty</MenuItem>
// <MenuItem value={30}>Thirty</MenuItem> 

// render() {
//   const classes = useStyles();
//   return (
//     <div>
//       <FormControl className={classes.formControl}>
//         <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={this.state.newExercise.name}
//           onChange={this.handleChange}
//         >
//           <div>{this.props.exercise.length === 0 ? <p>No data to display</p> :
//             this.props.exercise.map((item, index) => {
//               return (
//                 <ExerciseItem key={index} item={item} name={item.exercise_name} />
//               )
//             })
//           }
//           </div>
//           {/* <MenuItem value={10}>Ten</MenuItem>
//               <MenuItem value={20}>Twenty</MenuItem>
//               <MenuItem value={30}>Thirty</MenuItem> */}
//         </Select>
//       </FormControl>

//     </div>
//   )
// }
// }




//   < TextField
// type = "Number"
// required
// placeholder = "Set"
// label = "Set"
// value = { this.state.set }
// onChange = {(event) => this.handleSetChange('set', event)}
//         >
//         </TextField >

//   <TextField
//     type="Number"
//     required
//     placeholder="Reps"
//     label="Reps"
//     value={this.state.exerciseInstance.set1.rep}
//     onChange={(event) => this.handleSetChange('rep', event)}
//   >
//   </TextField>

//   <TextField
//     type="Number"
//     required
//     placeholder="Weight"
//     label="Weight"
//     value={this.state.exerciseInstance.set1.weight}
//     onChange={(event) => this.handleSetChange('weight', event)}
//   >
//   </TextField>
//   <Button color="primary" variant="contained" size="small">Add Set</Button>
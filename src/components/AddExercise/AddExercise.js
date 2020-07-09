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


// const useStyles = makeStyles((theme) => ({
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   selectEmpty: {
//     marginTop: theme.spacing(2),
//   },
// }));


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
    set: 1,
    newExercise: {
      name: 'default',
    },
    exerciseInstance: {
      set1: {
        set: 1,
        rep: 0,
        weight: 0,
      },
      set2: {
        set: 2,
        rep: 0,
        weight: 0,
      },
      set3: {
        set: 3,
        rep: 0,
        weight: 0,
      },
      set4: {
        set: 4,
        rep: 0,
        weight: 0,
      },
    }
  };

  // componentDidMount() {
  //   this.setState({ newExercise: {name: 'temp' } })
  // }

  handleChange = (propertyName, event) => {
    console.log(event);
    console.log(this.state);
    // for(let i = 0; i < arguments.length; i++) {
    //   console.log(`Arguments are: ${arguments[i]}`)
    // }
    console.log(`Event.target.value is: ${event.target.value}`)
    this.setState({
      newExercise: {
        [propertyName]: event.target.value
      }
    })
  }

  handleSetChange = (propertyName, event) => {
    this.setState({
      exerciseInstance: {
        ...this.state.exerciseInstance,
        [propertyName]: event.target.value
      }
    })
  }

  render() {
    const { classes } = this.props;
    console.log('test ' + this.state.newExercise.name);

    return (
      <div>
        {/* {this.state.newExercise.name === undefined ? <p>No data to display</p> : <div> */}
        <FormControl className={classes.formControl} >

          <InputLabel id="demo-simple-select-label">Exercise</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.newExercise.name || 'default'}
            onChange={(event) => this.handleChange('name', event)}
          >
            <div>{this.props.exercise.length === 0 ? <MenuItem value="default">default</MenuItem> :
              this.props.exercise.map((item, index) => {
                return (
                  <MenuItem value={item.exercise_name}>{item.exercise_name}</MenuItem>
                )
              })
            }

            </div>
          </Select>
        </FormControl>
        {/* </div> } */}
        <TextField
          type="Number"
          required
          placeholder="Set"
          label="Set"
          value={this.state.set}
          onChange={(event) => this.handleSetChange('set', event)}
        >
        </TextField>

        <TextField
          type="Number"
          required
          placeholder="Reps"
          label="Reps"
          value={this.state.exerciseInstance.set1.rep}
          onChange={(event) => this.handleSetChange('rep', event)}
        >
        </TextField>

        <TextField
          type="Number"
          required
          placeholder="Weight"
          label="Weight"
          value={this.state.exerciseInstance.set1.weight}
          onChange={(event) => this.handleSetChange('weight', event)}
        >
        </TextField>
        <Button color="primary" variant="contained" size="small">Add Set</Button>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    exercise: state.exercise
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

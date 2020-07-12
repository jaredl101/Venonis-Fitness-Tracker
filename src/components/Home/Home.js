import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';



// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class Home extends Component {
  render() {
    return (
      <div>
        <p id="welcome">
          Welcome, {this.props.user.first_name}, you created your account {moment(this.props.user.date_created).endOf('day').fromNow() }!
    </p>
        <div className="addNewWorkout">
        <h1>Add a new workout below:</h1> 
        <br />
        <Link to="/AddExercise">
        <Button variant="contained" color="primary" size="small">Add new Workout</Button>
          </Link>
        <br />
        </div>
        <div className="workout">
          <h1>View all previous workouts:</h1>
          <br />
          <Link to="/workout">
          <Button variant="contained" color="secondary" size="small">View Previous Workouts</Button>
          </Link>
          <br />
          <br />
        </div>
        <LogOutButton className="log-in" />
      </div>
    )
  }
}



// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Home);

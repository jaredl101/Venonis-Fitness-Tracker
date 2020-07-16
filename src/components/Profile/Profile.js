import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Profile.css';
import { TextField, Button } from '@material-ui/core';
import BodyweightChart from '../BodyweightChart/BodyweightChart.js';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Profile extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_BODYWEIGHT', payload: { id: this.props.user.id } });
  }

  state = {
    editMode: false,
    newAvatar: '',
    currentWeight: '',
    updateWeightMode: false,
  }

  handleChange = (propertyName, event) => {
    // Updates our local state when input is changed
    this.setState({
      [propertyName]: event.target.value
    })
  }

  onError = () => {
    this.props.dispatch({ type: 'UPDATE_AVATAR', payload: { id: this.props.user.id, newAvatar: 'images/default.png' } })
    this.setState({ editMode: false });
  }

  updateAvatar = () => {
    this.props.dispatch({ type: 'UPDATE_AVATAR', payload: { id: this.props.user.id, newAvatar: this.state.newAvatar } })
    this.setState({ editMode: false });
  }

  updateWeight = () => {
    let date = new Date();
    this.props.dispatch({type: 'ADD_BODYWEIGHT', payload: {id: this.props.user.id, weight: this.state.currentWeight, date: date }})
    this.setState({ updateWeightMode: false });
  }

  weightMode = () => {
    this.setState({updateWeightMode: true});
  }

  deleteWeight = () => {
    let answer = window.confirm("Are you sure you want to delete your most recent bodyweight entry?")
    if (answer) {
      this.props.dispatch({ type: 'DELETE_BODYWEIGHT', payload: { id: this.props.user.id } })
      console.log(`Last bodyweight entry for ${this.props.user.username} was deleted.`);
    }
    else {
      console.log('Bodyweight was not deleted');
    }
  }
  
  render() {
    const { bodyweight } = this.props;
    return (
      <div>
        {
          this.state.editMode === true ?
            <form onSubmit={this.updateAvatar}>
              <TextField
                type="text"
                required
                placeholder="Avatar URL"
                label="Avatar URL"
                onChange={(event) => this.handleChange('newAvatar', event)}
              />
              <Button onClick={this.updateAvatar} variant="contained" color="primary" size="small" type="Submit">Update</Button>
            </form>

            :
            <div>
              <button onClick={() => this.setState({ editMode: !this.state.editMode })}>Edit Avatar</button>
              <br />
              <br />
              <img id="avatar" onError={this.onError} src={this.props.user.avatar} alt="avatar" />
              <br />
              <p>Name: {this.props.user.first_name} {this.props.user.last_name}</p>
              <p>Username: {this.props.user.username}</p>
              {/* <p>Account Created: {moment(this.props.user.date_created).subtract(10, 'days').calendar()}</p> */}
              <p>Account Created: {moment(this.props.user.date_created).format("MMMM Do YYYY")}</p>

              {bodyweight.length > 0 ? 
              <p>Current Weight: {bodyweight[bodyweight.length-1].user_bodyweight}lbs</p>
              :
              <p>Bodyweight Loading</p>
                  }
                  
                  <Button onClick={this.weightMode} variant="contained" color="primary" size="small" >Log Weight</Button>
                  <Button onClick={this.deleteWeight} variant="contained" color="secondary" size="small">Delete Most Recent Entry</Button>
              {this.state.updateWeightMode === true ?
                // <form onSubmit={this.updateWeight}>
                <div>
                  <TextField
                    type="text"
                    required
                    //placeholder="New Title"
                    label="Current Weight(lbs)"
                    onChange={(event) => this.handleChange('currentWeight', event)}
                  />
                  <Button onClick={this.updateWeight} variant="contained" color="primary" size="small" type="Submit">Update Weight</Button>
                  {/* // </form> */}
                </div>
                :
                <></>

              }

              {bodyweight.length === 0 ?

                  <p id="noWeight"><span>Bodyweight chart will show once 3 weights have been logged!</span></p>
                :
                <div>
                <BodyweightChart />
                </div>
              }
              

              
            </div>
        }
      </div>

    )

  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    exercise: state.exercise,
    bodyweight: state.bodyweight,
  }
}

export default connect(mapStateToProps)(Profile);

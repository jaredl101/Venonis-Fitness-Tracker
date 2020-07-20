import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Profile.css';
import { TextField, Button } from '@material-ui/core';
import BodyweightChart from '../BodyweightChart/BodyweightChart.js';
import swal from 'sweetalert';

import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';

class Profile extends Component {
  state = {
    editMode: false,
    newAvatar: '',
    currentWeight: '',
    updateWeightMode: false,
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_BODYWEIGHT', payload: { id: this.props.user.id } });
  }

  handleChange = (propertyName, event) => {
    // Updates our local state when input is changed
    this.setState({
      [propertyName]: event.target.value
    })
  }

  onError = () => {
    // If there avatar is a broken, reset it to default
    this.props.dispatch({ type: 'UPDATE_AVATAR', payload: { id: this.props.user.id, newAvatar: 'images/default.png' } })
    this.setState({ editMode: false });
    swal("Reverted!", "Your avatar URL was not valid, your avatar has been reset to default!", "error");
  }

  updateAvatar = () => {
    // Update their avatar in the db with the link provided(must be valid image)
    this.props.dispatch({ type: 'UPDATE_AVATAR', payload: { id: this.props.user.id, newAvatar: this.state.newAvatar } })
    this.setState({ editMode: false });
    swal("Submitted!", "Your avatar has been successfully updated!", "success");

  }

  updateWeight = () => {
    // Add the user's bodyweight to the database
    let date = new Date();
    this.props.dispatch({ type: 'ADD_BODYWEIGHT', payload: { id: this.props.user.id, weight: this.state.currentWeight, date: date } })
    this.setState({ updateWeightMode: false });
  }

  weightMode = () => {
    // This will determine whether they have clicked the button to update their weight
    this.setState({ updateWeightMode: true });
  }


  
  deleteWeight = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, your logged weight will permanently be removed from the database!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Your most recent entry has been deleted!", {
            icon: "success",
          });
          this.props.dispatch({ type: 'DELETE_BODYWEIGHT', payload: { id: this.props.user.id } })
        } else {
          swal("Your most recent weight was not removed!");
        }
      });
  }

  render() {
    const { bodyweight, user } = this.props;
    return (
      <div>
        {
          this.state.editMode === true ?
            <form onSubmit={this.updateAvatar}>
              <TextField
                variant="outlined"
                type="text"
                required
                placeholder="Avatar URL"
                label="Avatar URL"
                onChange={(event) => this.handleChange('newAvatar', event)}
              />
              <br />
              <br />
              <Button onClick={this.updateAvatar} variant="contained" color="primary" size="small" type="Submit">Update</Button>
            </form>

            :
            <div>
              <br />
              <Button variant="contained" color="primary" size="small" onClick={() => this.setState({ editMode: !this.state.editMode })}>Edit Avatar<CreateIcon/></Button>
              <br />
              <br />
              <img id="avatar" onError={this.onError} src={user.avatar} alt="avatar" />
              <br />
              <p>Name: {user.first_name} {user.last_name}</p>
              <p>Username: {user.username}</p>
              {/* <p>Account Created: {moment(this.props.user.date_created).subtract(10, 'days').calendar()}</p> */}
              <p>Account Created: {moment(user.date_created).format("MMMM Do YYYY")}</p>

              {bodyweight.length > 0 ?
                <p>Current Weight: {bodyweight[bodyweight.length - 1].user_bodyweight}lbs</p>
                :
                <p>Bodyweight Loading</p>
              }

              <Button onClick={this.weightMode} variant="contained" color="primary" size="small" >Log Weight<CreateIcon /></Button>
              <Button onClick={this.deleteWeight} variant="contained" color="secondary" size="small">Delete Most Recent Entry<DeleteForeverIcon/></Button>
              <br />
              <br />
              {this.state.updateWeightMode === true ?
                // <form onSubmit={this.updateWeight}>
                <div>
                  <TextField
                    type="text"
                    required
                    variant="outlined"
                    //placeholder="Weight"
                    label="Current Weight(lbs)"
                    onChange={(event) => this.handleChange('currentWeight', event)}
                  />
                  <Button onClick={this.updateWeight} variant="contained" color="primary" size="small" type="Submit">Update Weight<UpdateIcon/></Button>
                  {/* // </form> */}
                </div>
                :
                <></>
              }
              {bodyweight.length < 3 ?
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

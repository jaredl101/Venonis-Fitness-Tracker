import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Profile.css';
import { TextField, Button } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Profile extends Component {
  state = {
    editMode: false,
    newAvatar: '',
    weight: [],
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
    this.props.dispatch({type: 'UPDATE_WEIGHT', payload: {id: this.props.user.id, currentWeight: this.state.currentWeight, date: date }})
    this.setState({ updateWeightMode: false });
  }

  newWeight = () => {
    this.setState({ updateWeightMode: !this.state.updateWeightMode })
  }
  render() {

    return (
      <div>
        {
          this.state.editMode === true ?
            <form onSubmit={this.updateAvatar}>
              <TextField
                type="text"
                required
                //placeholder="New Title"
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
            
              {this.state.currentWeight === '' ?

                  <p id="noWeight"><span>Please update your weight to begin tracking it!</span></p>
                :
                <p>Current Weight: {this.state.currentWeight}lbs</p>
              }
              <button onClick={this.newWeight}>Log Weight</button>

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
  }
}

export default connect(mapStateToProps)(Profile);

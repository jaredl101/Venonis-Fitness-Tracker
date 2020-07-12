import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Profile extends Component {
render(){
  return (
    <div>
      <img src={this.props.user.avatar} alt="avatar" />
      <p>Name: {this.props.user.first_name} {this.props.user.last_name}</p>
      <p>Username: {this.props.user.username}</p>
      <p>Account Created: {moment(this.props.user.date_created).subtract(10, 'days').calendar()}</p>
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

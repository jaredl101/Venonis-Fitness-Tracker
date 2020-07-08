import React, { Component } from 'react';
import { Button } from '@material-ui/core';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

class Landing extends Component {
  render() {
    return (
      <div>
        <img src='images/bench.jpeg' alt='Example'></img>
        <br />
        <Button variant="contained" color="secondary" size="medium" type="submit">Begin</Button>
      </div>
    )
  }
}  


export default Landing;

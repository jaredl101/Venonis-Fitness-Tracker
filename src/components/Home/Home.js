import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';


import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";


const useStyles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    }
  }
});

class Home extends Component {
  render() {
    //const classes = useStyles();
    const { user, classes } = this.props;
    return (
      <>
        <p>Welcome, {user.first_name}! You created your account {moment(user.date_created).endOf('day').fromNow()}!</p>
        <div className={classes.root}>
        <Grid container spacing={3} >

          <Grid item xs={4}>
            <Paper>
              <img
                max-width="690"
                //width="280"
                height="280"
                alt='Add Exercise'
                src={'images/dumbbells.jpg'}
              />
              <br />
              <Link to="/AddExercise"><Button variant="contained" color="primary" size="small">Add new Workout</Button></Link>
            </Paper>
          </Grid>
         
          <Grid item xs={4}>
            <Paper>
              <img
                max-width="690"
                height="280"
                alt='History'
                src={'images/journal.jpg'}
              />
              <br />
              <Link to="/workout">
                <Button variant="contained" color="secondary" size="small">View Previous Workouts</Button>
              </Link>
            </Paper>
          </Grid>
          {/* <Grid item xs={6}>
        <LogOutButton className="log-in" />
          </Grid> */}
        </Grid>
        </div>
      </>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
});


export default connect(mapStateToProps)(withStyles(useStyles)(Home));

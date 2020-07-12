import React, { Component } from 'react';
import { connect } from 'react-redux';

//

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
//import DeleteIcon from '@material-ui/icons/Delete';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';


class Workout extends Component {
  state = {
    wadu: 'hek'
  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_HISTORY' });
  }

    //  {/* (condition) ? [return for true] : [return for false]; */ }
  render() {
    console.log('this.props.set', this.props.set);
    return (
      <>
        {this.props.history.length === 0 ? <p>No Data</p> :
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Exercise Name</TableCell>
              <TableCell align='center'>Set</TableCell>
              <TableCell align='center'>Rep</TableCell>
              <TableCell align='center'>Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
        
            {this.props.history.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell align='center'>{this.props.user.username}</TableCell>
                <TableCell align='center'>{moment(item.date).format("MMM Do YY")}</TableCell>
                <TableCell align='center'>{item.exercise_name}</TableCell>
                <TableCell align='center'>{item.set_number}</TableCell>
                <TableCell align='center'>{item.rep}</TableCell>
                <TableCell align='center'>{item.weight}</TableCell>
              </TableRow>
            ))
            }
          </TableBody>
  
        </Table>
      </TableContainer>
  }
      </>
    )
  }
}
{/* <TableCell align='center'><Button onClick={() => this.deletePizza(pizza.id)} variant="contained" color="secondary"><DeleteIcon />delete</Button></TableCell> */}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    exercise: state.exercise,
    set: state.set,
    history: state.history,
  }
}

 {/* <TableBody>
  {this.props.set.map(item, index => (
    <TableRow key={item.id}>
      <TableCell align='center'>{this.props.user.username}</TableCell>
      <TableCell align='center'>date</TableCell>
      <TableCell align='center'>{index + 1}</TableCell>
      <TableCell align='center'>{item.rep}</TableCell>
      <TableCell align='center'>{item.weight}</TableCell>
    </TableRow>
  ))}

</TableBody>  */}

export default connect(mapStateToProps)(Workout);
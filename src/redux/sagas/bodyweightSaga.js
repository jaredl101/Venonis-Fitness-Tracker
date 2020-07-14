import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchBodyweight(action) {
  try {

    // passes the exercise object from the payload to the server
    const response = yield axios.get('/api/bodyweight');
    yield put({ type: 'SET_BODYWEIGHT', payload: response.data });
  } catch (error) {
    console.log('Error with bodyweight saga', error);
  }
}

function* addBodyweight(action) {

  try {
    let item = action.payload;
    yield axios.post(`/api/bodyweight`, item);
    yield put({ type: 'FETCH_BODYWEIGHT' });
  } catch (error) {
    alert('Unable to POST bodyweight to server', error);
  }
}

// function* deleteWeight(action) {
//   //DELETE THE FRUIT
//   let item = action.payload;
//   try {
//     yield axios.delete(`/api/set/${item.id}`);
//     yield put({ type: 'FETCH_SETS' });
//     yield put({type: 'FETCH_HISTORY'});
//   } catch (error) {
//     alert('Unable to delete set from server', error);
//   }
// }


function* bodyweightSaga() {
  yield takeEvery('FETCH_BODYWEIGHT', fetchBodyweight); // take latest vs take every
  yield takeEvery('ADD_BODYWEIGHT', addBodyweight); // take latest vs take every

}

export default bodyweightSaga;

import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchSets(action) {
  try {

    // passes the exercise object from the payload to the server
    const response = yield axios.get('/api/set');
    yield put({ type: 'SET_SETS', payload: response.data });
  } catch (error) {
    console.log('Error with set saga', error);
  }
}

function* addSet(action) {

  try {
    let item = action.payload;
    yield axios.post(`/api/set`, item);
    yield put({ type: 'FETCH_SETS' });
  } catch (error) {
    alert('Unable to POST set to server', error);
  }
}

function* deleteSet(action) {
  //DELETE THE FRUIT
  let item = action.payload;
  try {
    yield axios.delete(`/api/set/${item.id}`);
    yield put({ type: 'FETCH_SETS' });
    yield put({type: 'FETCH_HISTORY'});
  } catch (error) {
    alert('Unable to delete set from server', error);
  }
}


function* setSaga() {
  yield takeEvery('FETCH_SETS', fetchSets); // take latest vs take every
  yield takeEvery('ADD_SET', addSet); // take latest vs take every
  yield takeEvery('DELETE_SET', deleteSet);

}

export default setSaga;

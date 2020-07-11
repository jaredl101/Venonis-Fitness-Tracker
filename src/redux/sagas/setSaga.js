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
    yield axios.post(`/api/set`, action.payload);
    yield put({ type: 'FETCH_SETS' });
  } catch (error) {
    alert('Unable to POST set to server', error);
  }
}


function* setSaga() {
  yield takeEvery('FETCH_SETS', fetchSets); // take latest vs take every
  yield takeEvery('ADD_SET', addSet); // take latest vs take every

}

export default setSaga;

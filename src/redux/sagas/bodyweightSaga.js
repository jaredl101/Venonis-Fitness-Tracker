import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBodyweight(action) {
  try {
    let item = action.payload;
    const response = yield axios.get(`/api/bodyweight/${item.id}`);
    yield put({ type: 'SET_BODYWEIGHT', payload: response.data });
  } catch (error) {
    console.log('Error with bodyweight saga', error);
  }
}

function* addBodyweight(action) {

  try {
    let item = action.payload;
    yield axios.post(`/api/bodyweight`, item);
    yield put({ type: 'FETCH_BODYWEIGHT', payload: item });
  } catch (error) {
    alert('Unable to POST bodyweight to server', error);
  }
}

function* deleteBodyweight(action) {
  //DELETE THE most recent bodyweight entry for a specific user
  let item = action.payload;
  try {
    yield axios.delete(`/api/bodyweight/${item.id}`);
    yield put({ type: 'FETCH_BODYWEIGHT', payload: item  });
  } catch (error) {
    alert(`Unable to delete bodyweight from server for user id #${item.id}`, error);
  }
}


function* bodyweightSaga() {
  yield takeEvery('FETCH_BODYWEIGHT', fetchBodyweight); // take latest vs take every
  yield takeEvery('ADD_BODYWEIGHT', addBodyweight); // take latest vs take every
  yield takeEvery('DELETE_BODYWEIGHT', deleteBodyweight);

}

export default bodyweightSaga;

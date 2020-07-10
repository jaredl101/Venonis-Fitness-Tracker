import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions

function* fetchWorkoutId(action) {
  try {
    // passes the workout object from the payload to the server
    const response = yield axios.get(`/api/workout/${action.payload}`);
    console.log(`Response.data is: ${response.data}`)
    yield put({ type: 'SET_WORKOUT_ID', payload: response.data });
  } catch (error) {
    console.log('Error with workout ID saga', error);
  }
}

function* currentWorkoutSaga() {
  yield takeEvery('FETCH_WORKOUT_ID', fetchWorkoutId); // take latest vs take every

}

export default currentWorkoutSaga;

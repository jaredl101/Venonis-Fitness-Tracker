import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions

function* fetchExerciseId(action) {
  try {

    // passes the exercise object from the payload to the server
    const response = yield axios.get(`/api/exercise/${action.payload}`);
    console.log(`Response.data is: ${response.data}`)
    yield put({ type: 'SET_EXERCISE_ID', payload: response.data });
  } catch (error) {
    console.log('Error with exercise ID saga', error);
  }
}

function* currentExerciseSaga() {
  yield takeEvery('FETCH_EXERCISE_ID', fetchExerciseId); // take latest vs take every

}

export default currentExerciseSaga;

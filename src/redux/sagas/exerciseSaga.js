import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchExercises(action) {
  try {
    // passes the exercise object from the payload to the server
    const response = yield axios.get('/api/exercise');
    yield put({ type: 'SET_EXERCISES', payload: response.data });
  } catch (error) {
    console.log('Error with exercise saga', error);
  }
}

function* exerciseSaga() {
  yield takeEvery('FETCH_EXERCISES', fetchExercises); // take latest vs take every
}

export default exerciseSaga;

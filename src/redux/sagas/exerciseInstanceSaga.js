import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchExerciseInstance(action) {
  try {

    // passes the exercise object from the payload to the server
    const response = yield axios.get('/api/exercise_instance');
    yield put({ type: 'SET_EXERCISE_INSTANCE', payload: response.data });
  } catch (error) {
    console.log('Error with exercise_instance saga', error);
  }
}

function* addExerciseInstance(action) {

  try {
    yield axios.post(`/api/exercise_instance`, action.payload);
    //yield put({ type: 'FETCH_WORKOUTS' });
  } catch (error) {
    alert('Unable to POST exercise_instance to server', error);
  }
}


function* exerciseInstanceSaga() {
  yield takeEvery('FETCH_EXERCISE_INSTANCE', fetchExerciseInstance); // take latest vs take every
  yield takeEvery('ADD_EXERCISE_INSTANCE', addExerciseInstance); // take latest vs take every

}

export default exerciseInstanceSaga;

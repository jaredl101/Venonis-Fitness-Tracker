import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions

function* fetchExerciseId(action) {
  try {
    let item = action.payload;

    // passes the exercise object from the payload to the server
    const response = yield axios.get(`/api/exercise/${item.name}`);    
    item.currentExerciseId = response.data[0].id;
    yield put({ type: 'ADD_WORKOUT', payload: item });
  } catch (error) {
    console.log('Error with exercise ID saga', error);
  }
}

function* currentExerciseSaga() {
  yield takeEvery('FETCH_EXERCISE_ID', fetchExerciseId); // take latest vs take every

}

export default currentExerciseSaga;

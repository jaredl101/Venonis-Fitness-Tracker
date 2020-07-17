import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchExerciseId(action) {
  try {
    let item = action.payload;

    // passes the exercise object from the payload to the server
    const response = yield axios.get(`/api/exercise/${item.name}`);    
    item.currentExerciseId = response.data[0].id;
    yield put({ type: 'SET_CURRENT_EXERCISE', paload: item.name});
    yield put({ type: 'ADD_WORKOUT', payload: item });
  } catch (error) {
    console.log('Error with exercise ID saga', error);
  }
}

function* currentExerciseSaga() {
  yield takeEvery('FETCH_EXERCISE_ID', fetchExerciseId);

}

export default currentExerciseSaga;

import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWorkoutId(action) {
  try {
    // passes the workout object from the payload to the server
    let item = action.payload;
    const response = yield axios.get(`/api/workout/${item.userId}`);
    item.currentWorkoutId = response.data[0].max;
    yield put({ type: 'ADD_EXERCISE_INSTANCE', payload: item });
  } catch (error) {
    console.log('Error with workout ID saga', error);
  }
}

function* currentWorkoutSaga() {
  yield takeEvery('FETCH_WORKOUT_ID', fetchWorkoutId); 
}

export default currentWorkoutSaga;

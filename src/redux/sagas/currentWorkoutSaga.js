import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions

function* fetchWorkoutId(action) {
  try {
    // passes the workout object from the payload to the server
    let item = action.payload;
    console.log('HELP', item.userId);
    const response = yield axios.get(`/api/workout/${item.userId}`);
    console.log('123', response.data);
    console.log(`In currentWorkoutSaga response.data is: ${response.data[0]}`)



    item.currentWorkoutId = response.data;
  
    console.log('xD', item.currentWorkoutId);
    //item.currentExerciseId = response.data[0].id;
    console.log(`Response.data is: ${response.data}`)
    yield put({ type: 'ADD_EXERCISE_INSTANCE', payload: item });
  } catch (error) {
    console.log('Error with workout ID saga', error);
  }
}

function* currentWorkoutSaga() {
  yield takeEvery('FETCH_WORKOUT_ID', fetchWorkoutId); // take latest vs take every

}

export default currentWorkoutSaga;

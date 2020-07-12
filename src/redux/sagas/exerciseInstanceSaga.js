import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchExerciseInstance(action) {
  try {

    let item = action.payload;
    console.log('in fetchExerciseInstance in exerciseInstanceSaga, 123,', item);
    // passes the exercise object from the payload to the server
    const response = yield axios.get(`/api/exercise_instance/${item.currentWorkoutId}`);
    console.log(`xxxxxxxxx In exerciseInstanceSaga response.data is: ${response.data}`);

    console.log(`In exerciseInstanceSaga response.data[0] is: ${response.data[0]}`);

    item.currentExerciseInstanceId = response.data[0].max;
    console.log('ARE WE GETTING THIS FAR?', item.currentExerciseInstanceId);
    yield put({ type: 'ADD_SET', payload: item });
  } catch (error) {
    console.log('Error with exercise_instance saga', error);
  }
}

function* addExerciseInstance(action) {

  try {
    let item = action.payload;
    console.log(`In exerciseInstanceSaga item is: ${item}`)
    yield axios.post(`/api/exercise_instance`, item);
    yield put({ type: 'FETCH_EXERCISE_INSTANCE', payload: item });
  } catch (error) {
    alert('Unable to POST exercise_instance to server', error);
  }
}


function* exerciseInstanceSaga() {
  yield takeEvery('FETCH_EXERCISE_INSTANCE', fetchExerciseInstance); // take latest vs take every
  yield takeEvery('ADD_EXERCISE_INSTANCE', addExerciseInstance); // take latest vs take every

}

export default exerciseInstanceSaga;

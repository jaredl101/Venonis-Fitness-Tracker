import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions

function* fetchExerciseId(action) {
  try {
    let item = action.payload;
    console.log('WHY THE FUCK ISNT THIS WORKING: ', item.name);

    // passes the exercise object from the payload to the server
    const response = yield axios.get(`/api/exercise/${item.name}`);
    console.log("response.status is: ", response.status)
    
    item.currentExerciseId = response.data[0].id;
    console.log("HELLO", item.currentExerciseId );
   
    let data = response.data;
    console.log('5', data);
    console.log('***********************************************************************');
    console.log(typeof(response.data));
    item.currentExerciseId = response.data[0];
    console.log("Our current id for our exercise is: ", item.currentExerciseId);
    console.log(`Response.data is: ${response.data}`)
    yield put({ type: 'ADD_WORKOUT', payload: item });
  } catch (error) {
    console.log('Error with exercise ID saga', error);
  }
}

function* currentExerciseSaga() {
  yield takeEvery('FETCH_EXERCISE_ID', fetchExerciseId); // take latest vs take every

}

export default currentExerciseSaga;

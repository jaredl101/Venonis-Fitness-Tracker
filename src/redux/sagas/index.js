import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import exerciseSaga from './exerciseSaga';
import currentExerciseSaga from './currentExerciseSaga';
import workoutSaga from './workoutSaga';
import currentWorkoutSaga from './currentWorkoutSaga';
import exerciseInstanceSaga from './exerciseInstanceSaga';
import setSaga from './setSaga';
import historySaga from './historySaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    exerciseSaga(),
    currentExerciseSaga(),
    workoutSaga(),
    currentWorkoutSaga(),
    exerciseInstanceSaga(),
    setSaga(),
    historySaga(),
  ]);
}

const currentExerciseReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXERCISE_ID':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default currentExerciseReducer;

const currentExerciseReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CURRENT_EXERCISE':
      return action.payload;
    case 'RESET_EXERCISES':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default currentExerciseReducer;

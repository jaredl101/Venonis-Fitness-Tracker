const currentWorkoutReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WORKOUT_ID':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default currentWorkoutReducer;

const exerciseReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EXERCISES':
      return action.payload;
    case 'RESET_EXERCISES':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default exerciseReducer;

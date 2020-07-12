const setReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SETS':
      return action.payload;
    case 'RESET_SETS':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default setReducer;

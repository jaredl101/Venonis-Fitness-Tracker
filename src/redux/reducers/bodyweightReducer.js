const bodyweightReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BODYWEIGHT':
      return action.payload;
    case 'RESET_BODYWEIGHT':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default bodyweightReducer;

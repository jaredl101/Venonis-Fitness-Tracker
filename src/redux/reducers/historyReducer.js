const historyReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_HISTORY':
      return action.payload;
    case 'RESET_HISTORY':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default historyReducer;

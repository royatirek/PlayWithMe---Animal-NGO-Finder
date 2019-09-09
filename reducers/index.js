const reducer = (state, action) => {
    switch (action.type) {
      case 'SAVE_JSON':
      // debugger;
        return {
            ...state,
            json:action.json
            
    };
    case 'SAVE_CURRENT_LOCATION':
    // debugger;
      return {
          ...state,
          lat:action.lat,
          long:action.long
          
  };
      default:
        return state
    
    }
  }
  
  export default reducer;
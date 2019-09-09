export function saveSortedJSON(json) {
    // debugger;
    return {type: 'SAVE_JSON', json};
  }

export function saveCurrentLocation(lat,long) {
    // debugger;
    return {type: 'SAVE_CURRENT_LOCATION',lat,long };
  }
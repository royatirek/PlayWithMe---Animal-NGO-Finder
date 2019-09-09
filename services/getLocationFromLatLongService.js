const getLocationfromLatLong=(coor)=>{


    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coor.lat},${coor.long}&key=${key}`;
    return fetch(url,
        {
            method: 'GET'
        }).then(function(response) {
                return response.json();
       });
}

export default getLocationfromLatLong;
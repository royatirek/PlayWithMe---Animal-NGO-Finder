const sheltersService=()=>{


    let url = 'https://s3.ap-south-1.amazonaws.com/playwithme999/jsonPlayWithMe.json';
    return fetch(url,
        {
            method: 'GET'
        }).then(function(response) {
                return response.json();
       });
}

export default sheltersService;
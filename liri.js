require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var spotifyAPI = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var command = process.argv[2];
var userInput = process.argv[3];

function concert(userInput){
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
        function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
}
if(command === 'concert-this'){
    concert(userInput);
}else{
    console.log("not a command");
};
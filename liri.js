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
        if(response.data.length <= 0){
            console.log("this band does not have any upcoming concerts. Please try again later.")
        }else{
        console.log("You want to see " + userInput + " live in concert")
          for(var i = 0; i < response.data.length; i++){
              console.log("=============");
              console.log(i);
              console.log("The venue is " + response.data[i].venue.name);
              console.log(response.data[i].venue.name+ " is located in " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
              console.log("This concert will be held on " + response.data[i].datetime);            
            };
        };

        fs.appendFile("log.txt", "Command Line used:  " + command +" " + userInput + ". ", function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Artist added to log.txt!");
            };
          });
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
};

function movie(userInput){
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + userInput).then(
        function(response) {
            console.log("The title of the movie is " + response.data.Title + "(" + response.data.Year + ")");
            for(var i = 0; i < 2; i++){
                console.log(response.data.Ratings[i].Source + ": " + response.data.Ratings[i].Value);
            };
            console.log("This movie was produced in " + response.data.Country + " in " + response.data.Language);
            console.log("The Plost of the movie is: " + response.data.Plot);
            console.log("This movie stars: " + response.data.Actors);
            fs.appendFile("log.txt", "Command Line used:  " + command +" " + userInput + ". ", function (err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Movie added to log.txt!");
                };
              });
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

};

if(command === 'concert-this'){
    concert(userInput);
}else if(command === 'movie-this'){
    movie(userInput);
}else{
    console.log("not a command.")
};
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment")

var args = process.argv;
var command = args[2];
let userInput = args.splice(3).join(" ");


function concertThis() {
    if (!userInput) {
        axios.get("https://rest.bandsintown.com/artists/Celine+Dion/events?app_id=codingbootcamp").then(
            function (response) {
                console.log("You want to see Celine Dion live in concert")
                for (var i = 0; i < response.data.length; i++) {
                    console.log("======================================================================================================");
                    console.log(i);
                    console.log("The venue is " + response.data[i].venue.name);
                    console.log(response.data[i].venue.name + " is located in " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                    console.log("This concert will be held on " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                };
                fs.appendFile("log.txt", "\nCommand Line used:  " + command + " Celine Dion. ", function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Artist added to log.txt!");
                    };
                });
                console.log("======================================================================================================");
            }).catch(function (err) {
                console.error("Error occurred: " + err);
            });
    } else {
        axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp").then(
            function (response) {
                if (response.data.length <= 0) {
                    console.log("======================================================================================================");
                    console.log("this band does not have any upcoming concerts. Please try again later.");
                    console.log("======================================================================================================");
                } else {
                    console.log("======================================================================================================");
                    console.log("You want to see " + userInput + " live in concert")
                    for (var i = 0; i < response.data.length; i++) {
                        console.log("=============");
                        console.log(i);
                        console.log("The venue is " + response.data[i].venue.name);
                        console.log(response.data[i].venue.name + " is located in " + response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country);
                        console.log("This concert will be held on " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                    };

                    fs.appendFile("log.txt", "\nCommand Line used:  " + command + " " + userInput + ". ", function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("Artist added to log.txt!");
                        };
                    });
                    console.log("======================================================================================================");
                };
            }).catch(function (error) {
                if (error.response) {
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };
};


function movieThis() {
    if (!userInput) {
        axios.get("http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody").then(
            function (response) {
                console.log("======================================================================================================");
                console.log("The title of the movie is Mr. Nobody(" + response.data.Year + ")");
                for (var i = 0; i < 2; i++) {
                    console.log(response.data.Ratings[i].Source + ": " + response.data.Ratings[i].Value);
                };
                console.log("This movie was produced in " + response.data.Country + " in " + response.data.Language);
                console.log("The plot of the movie is: " + response.data.Plot);
                console.log("This movie stars: " + response.data.Actors);
                fs.appendFile("log.txt", "\nCommand Line used:  " + command + " Mr. Nobody. ", function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Movie added to log.txt!");
                    };
                });
                console.log("======================================================================================================");
            }).catch(function (err) {

                console.error("Error occurred: " + err);
            });
    } else {
        axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + userInput).then(
            function (response) {
                console.log("======================================================================================================");
                console.log("The title of the movie is " + response.data.Title + "(" + response.data.Year + ")");
                for (var i = 0; i < 2; i++) {
                    console.log(response.data.Ratings[i].Source + ": " + response.data.Ratings[i].Value);
                };
                console.log("This movie was produced in " + response.data.Country + " in " + response.data.Language);
                console.log("The plot of the movie is: " + response.data.Plot);
                console.log("This movie stars: " + response.data.Actors);

                fs.appendFile("log.txt", "\nCommand Line used:  " + command + " " + userInput + ". ", function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Movie added to log.txt!");
                    };
                });
                console.log("======================================================================================================");
            })
            .catch(function (error) {
                if (error.response) {
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                console.log(error.config);
            });
    };
};

function spotifyThis() {
    if (!userInput) {
        spotify.request("https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE")
            .then(function (response) {
                console.log("======================================================================================================");
                console.log("The artist who sings this song is: " + response.artists[0].name);
                console.log("The song is: " + response.name);
                console.log("The url for this song: " + response.external_urls.spotify);
                console.log("The album this song is on is: " + response.album.name);
                fs.appendFile("log.txt", "\nCommand Line used:  " + command + " The Sign. ", function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Song added to log.txt!");
                    };
                });
                console.log("======================================================================================================");
            })
            .catch(function (err) {
                console.log(err);
            });
    } else {
        spotify
            .search({ type: 'track', query: userInput, limit: 1 })
            .then(function (response) {
                console.log("======================================================================================================");
                console.log("The song you searched for is: " + userInput);
                console.log("The album this song is on is: " + response.tracks.items[0].album.name);
                console.log("The artist who sings this song is: " + response.tracks.items[0].artists[0].name);
                console.log("The url for this song: " + response.tracks.items[0].external_urls.spotify);
                fs.appendFile("log.txt", "\nCommand Line used:  " + command + " " + userInput + ". ", function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Song added to log.txt!");
                    };
                });
                console.log("======================================================================================================");
            })
            .catch(function (err) {
                console.log(err);
            });
    }
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        } else {
            console.log("======================================================================================================");
            console.log(data);
            var dataArr = data.split(",");
            command = dataArr[0];
            userInput = dataArr[1];
            spotifyThis();
            console.log("======================================================================================================");
        };
    });
};


if (command === 'concert-this') {
    concertThis();
} else if (command === 'movie-this') {
    movieThis();
} else if (command === 'spotify-this-song') {
    spotifyThis();
} else if (command === 'do-what-it-says') {
    doWhatItSays();
} else {
    console.log("Not a command. Please try again with either 'concert-this', 'movie-this', 'spotify-this-song', or 'do-what-it-says'.");
};
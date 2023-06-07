// base_url = 'https://app.ticketmaster.com/discovery/v2/'
const axios = require("axios");
const {response} = require("express");
const {add} = require("nodemon/lib/rules");
const geohash = require('ngeohash');
const SpotifyWebApi = require("spotify-web-api-node");
const ticketmasterApi = 'a9gK4wmxw4DTGolvLLZJuWzjMNfcMhSw'
const segmentIds = {'Default': '', 'Music': 'KZFzniwnSyZfZ7v7nJ', 'Sports': 'KZFzniwnSyZfZ7v7nE',
    'Arts & Theatre': 'KZFzniwnSyZfZ7v7na', 'Film': 'KZFzniwnSyZfZ7v7nn',
    'Miscellaneous': 'KZFzniwnSyZfZ7v7n1'}

const spotifyClient = 'bf93f3553ead4f409ee62a236010062b';
const spotifySecret = 'edd87daa7d424f9abc7354ceeb0cf09f';

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:8080/callback',
    clientId: spotifyClient,
    clientSecret: spotifySecret
});



function getSpotifyArtist(name, res) {
    spotifyApi.searchArtists(name).then((response) => {
        const artist = response.body.artists.items[0];
        let obj = {
            name: artist.name,
            followers: artist.followers.total,
            popularity: artist.popularity,
            link: artist.external_urls.spotify,
            image: artist.images[0].url
        }
        spotifyApi.getArtistAlbums(artist.id, {limit: 3}).then((response1) => {
            console.log(response1.body.items[0].images);
            try{
                const imageArray = [];
                for(let i=0; i < response1.body.items.length; i++) {
                    imageArray.push(response1.body.items[i].images[0].url);
                }
                obj.album = imageArray;
            }
            catch (e) {
                obj.album = undefined;
            }
            res.send(obj);
        })

    }).catch(error => {
        if(error.body && error.body.error && error.body.error.status === 401) {
            spotifyApi.clientCredentialsGrant().then(
                function(data) {
                    console.log('The access token expires in ' + data.body['expires_in']);
                    console.log('The access token is ' + data.body['access_token']);

                    // Save the access token so that it's used in future calls
                    spotifyApi.setAccessToken(data.body['access_token']);
                    getSpotifyArtist(name, res);
                },
                function(err) {
                    console.log(
                        'Something went wrong when retrieving an access token',
                        err.message
                    );
                }
            );
        }
        else {
            console.log(error);
            res.send(undefined);
        }
    });
}


function searchResult (keyword, distance, category, lat, lng, res) {
    const geoHash =  geohash.encode(lat, lng, 7);
    console.log(geoHash);
    axios.get("https://app.ticketmaster.com/discovery/v2/events",{
        params: {
            keyword: keyword,
            radius: distance,
            segmentId: segmentIds[category],
            geoPoint: geoHash,
            unit: 'miles',
            apikey: ticketmasterApi
        }
    })
        .then((response) => {
            if(response.data._embedded === undefined) {
                res.send(undefined);
                return;
            }
            let arr = []
            for(let i = 0; i < response.data._embedded.events.length; i++) {
                let data = response.data._embedded.events[i];
                if(data !== undefined) {
                    let temp = {};
                    if(data.name !== undefined) {
                        temp.name = data.name;
                    }
                    if(data.id !== undefined) {
                        temp.eventId = data.id;
                    }
                    if(data.dates !== undefined && data.dates.start !== undefined && data.dates.start.localDate !== undefined) {
                        temp.localDate = data.dates.start.localDate;
                    }
                    if(data.dates !== undefined && data.dates.start !== undefined && data.dates.start.localTime !== undefined) {
                        temp.localTime = data.dates.start.localTime;
                    }
                    if(data.images !== undefined && data.images.length > 0 && data.images[0].url !== undefined){
                        temp.imageURL = data.images[0].url;
                    }
                    if(data.classifications !== undefined && data.classifications.length > 0 && data.classifications[0].segment !== undefined && data.classifications[0].segment.name !== undefined) {
                        temp.genre = data.classifications[0].segment.name;
                    }
                    if(data._embedded !== undefined && data._embedded.venues !== undefined && data._embedded.venues.length > 0 && data._embedded.venues[0].name !== undefined){
                        temp.venue = data._embedded.venues[0].name;
                    }
                    arr.push(temp)
                }

            }
            res.send(arr)
        })
        .catch(err => {
            console.log(err);
            res.send(undefined);
        })
    // const obj = {keyword, distance, category, lat, lng};
    // return obj;
}
function searchVenue(keyword, res) {
    axios.get('https://app.ticketmaster.com/discovery/v2/venues.json', {
        params: {
            keyword: keyword,
            apikey: ticketmasterApi
        }
    })
        .then((response) => {
            const data = response.data._embedded.venues[0];
            if(data !== undefined) {
                let temp = {};
                if(data.address !== undefined && data.address.line1 !== undefined) {
                    temp.address = data.address.line1;
                }
                if(data.city !== undefined && data.city.name !== undefined && data.city.name.length > 0) {
                    temp.city = data.city.name;
                }
                if(data.state !== undefined && data.state.stateCode !== undefined && data.state.stateCode.length > 0) {
                    temp.state = data.state.stateCode;
                }
                if(data.postalCode !== undefined && data.postalCode.length > 0) {
                    temp.postalCode = data.postalCode;
                }
                if(data.url !== undefined && data.url.length > 0) {
                    temp.url = data.url;
                }
                if(data.images !== undefined && data.images.length > 0 && data.images[0].url !== undefined) {
                    temp.image = data.images[0].url
                }
                if(data.boxOfficeInfo !== undefined && data.boxOfficeInfo.phoneNumberDetail !== undefined) {
                    temp.phone = data.boxOfficeInfo.phoneNumberDetail
                }
                if(data.boxOfficeInfo !== undefined && data.boxOfficeInfo.openHoursDetail !== undefined) {
                    temp.openHours = data.boxOfficeInfo.openHoursDetail;
                }
                if(data.generalInfo !== undefined && data.generalInfo.generalRule !== undefined) {
                    temp.generalRule = data.generalInfo.generalRule
                }
                if(data.generalInfo !== undefined && data.generalInfo.childRule !== undefined) {
                    temp.childRule = data.generalInfo.childRule
                }
                res.send(temp);
            }
            else {
                res.send(undefined);
            }

        })
        .catch(err => {
            console.log(err);
            res.send(undefined);
        })
}

function searchEvent(id, res) {
    axios.get('https://app.ticketmaster.com/discovery/v2/events/', {
        params: {
            id: id,
            apikey: ticketmasterApi
        }
    })
        .then((response) => {
            const data = response.data._embedded.events[0];
            if(data !== undefined) {
                let temp = {};
                if(data._embedded !== undefined && data._embedded.venues !== undefined && data._embedded.venues.length > 0 && data._embedded.venues[0].name !== undefined) {
                    temp.venue = data._embedded.venues[0].name;
                }
                if (data.dates !== undefined && data.dates.start !== undefined && data.dates.start !== undefined && data.dates.start.localTime !== undefined) {
                    temp.localTime = data.dates.start.localTime;
                }
                if (data.dates !== undefined && data.dates.start !== undefined && data.dates.start !== undefined && data.dates.start.localDate !== undefined) {
                    temp.localDate = data.dates.start.localDate;
                }
                if (data.classifications !== undefined && data.classifications.length > 0 && data.classifications[0].segment !== undefined && data.classifications[0].segment.name !== undefined) {
                    temp.segment = data.classifications[0].segment.name;
                }
                if (data.classifications !== undefined && data.classifications.length > 0 && data.classifications[0].genre !== undefined && data.classifications[0].genre.name !== undefined) {
                    temp.genre = data.classifications[0].genre.name;
                }
                if (data.classifications !== undefined && data.classifications.length > 0 && data.classifications[0].subGenre !== undefined && data.classifications[0].subGenre.name !== undefined) {
                    temp.subGenre = data.classifications[0].subGenre.name;
                }
                if (data.classifications !== undefined && data.classifications.length > 0 && data.classifications[0].type !== undefined && data.classifications[0].type.name !== undefined) {
                    temp.type = data.classifications[0].type.name;
                }
                if (data.classifications !== undefined && data.classifications.length > 0 && data.classifications[0].subType !== undefined && data.classifications[0].subType.name !== undefined) {
                    temp.subType = data.classifications[0].subType.name;
                }
                if(data.priceRanges !== undefined && data.priceRanges.length > 0 && data.priceRanges[0].min !== undefined) {
                    temp.min = data.priceRanges[0].min;
                }
                if(data.priceRanges !== undefined && data.priceRanges.length > 0 && data.priceRanges[0].max !== undefined) {
                    temp.max = data.priceRanges[0].max;
                }
                if(data.dates !== undefined && data.dates.status !== undefined && data.dates.status.code !== undefined ) {
                    temp.statusCode = data.dates.status.code;
                }
                if (data.url !== undefined) {
                    temp.buyTicket = data.url;
                }
                if(data.seatmap !== undefined && data.seatmap.staticUrl !== undefined){
                    temp.seat =  data.seatmap.staticUrl;
                }
                if(data._embedded !== undefined && data._embedded.attractions !== undefined && data._embedded.attractions.length > 0 && data._embedded.attractions[0].url !== undefined) {
                    temp.upcomingEvent = data._embedded.attractions[0].url;
                }
                //_embedded -> attractions -> [0] -> name (all name) as artist
                console.log(response.data._embedded.events[0]._embedded);
                if(data._embedded !== undefined && data._embedded.attractions !== undefined && data._embedded.attractions.length > 0 ) {
                    let arr = [];
                    let musicArtist = [];
                    for (let i = 0; i < data._embedded.attractions.length; i++) {
                        arr.push(data._embedded.attractions[i].name)
                        console.log(data._embedded.attractions[i].classifications)
                        if(data._embedded.attractions[i].classifications[0].segment.name === "Music") {
                            musicArtist.push(data._embedded.attractions[i].name)
                        }
                    }
                    arr = arr.join(" | ")
                    temp.artist = arr;
                    temp.musicArtist = musicArtist;

                }

                res.send(temp);
            }
            else {
                res.send(undefined);
            }
            // res.send(response.data)
        })
        .catch(err => {
            console.log(err);
            res.send(undefined);
        })
}

function autoComplete(keyword, res) {
    if(keyword === '') {
        res.send([]);
        return;
    }
    axios.get('https://app.ticketmaster.com/discovery/v2/suggest/', {
        params: {
            keyword: keyword,
            apikey: ticketmasterApi
        }
    })
        .then((response) => {
            // TODO: _embedded -> attractions -> [0] -> name
            if(response.data._embedded === undefined) {
                res.send([])
                return;
            }
            let arr = []
            for (let i = 0; i < response.data._embedded.attractions.length; i++) {
                let data = response.data._embedded.attractions
                if(data !== undefined) {
                    arr.push(data[i].name);
                }
            }
            res.send(arr)

            // res.send(response.data)
        })
        .catch(err => {
            console.log(err);
            res.send([])
        })
}
module.exports = {searchResult, searchVenue, searchEvent, autoComplete, getSpotifyArtist}
const express = require('express')
const cors = require('cors')
const {searchResult, searchVenue, searchEvent, autoComplete, getSpotifyArtist} = require("./service");
const app = express()
const port = 8080

app.use(cors())
app.use(express.static(process.cwd() + "/static/hw8-final"))
app.use(express.static(process.cwd() + "/static/hw8-final/assets"))
app.listen(process.env.POST || port);

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/static/hw8-final/index.html')
})

app.get('/search', (req, res) => {
  res.sendFile(process.cwd() + '/static/hw8-final/index.html')
})

app.get('/favourites', (req, res) => {
  res.sendFile(process.cwd() + '/static/hw8-final/index.html')
})

baseUrl = '/api/v1'
app.get(baseUrl + "/search",(req, res) =>{
  let distance = req.query.distance;
  let category = req.query.category;
  let keyword = req.query.keyword;
  let lat = req.query.lat;
  let lng = req.query.lng;

  searchResult(keyword, distance, category, lat, lng, res);
  // via service
});

app.get(baseUrl + "/venue",(req, res) => {
  let keyword = req.query.keyword;
  const data = searchVenue(keyword, res);
})

app.get(baseUrl + "/event",(req,res) => {
  let id = req.query.id;

  searchEvent(id, res);
})

app.get(baseUrl + "/suggest", (req,res) =>{
  let keyword = req.query.keyword;
  autoComplete(keyword, res);
})

app.get(baseUrl + "/getSpotifyArtist", (req, res) => {
  let name = req.query.keyword;
  getSpotifyArtist(name, res);
})
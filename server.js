// Setup empty JS object to act as endpoint for all routes
projectData = {};

let req_id = 0 ;
// Require Express to run server and routes

/* Express to run server and routes */
const express = require('express');

/* Dependencies */
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;

/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };


// GET route
app.get('/all', getData);

function getData (request, response) {
  response.send(projectData);
};

// POST route
app.post('/add', callBack);

function callBack(req,res){
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
    // console.log(req_id);
    // Object.assign(projectData, req.body);
    // console.log(
    //  `id ${req_id++} temperature : ${projectData.temperature} date: ${projectData.date} userResponse: ${projectData.userResponse}`
    // );
//   console.log(projectData);
}

/* Global Variables */
const API_KEY = `cd21e1cbebc020db230d35b16e0cf2b3`;
let API_URL =`https://api.openweathermap.org/data/2.5/weather?zip=90001,us&appid=${API_KEY}`;
let zip_code =  document.getElementById('zip').value;   

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


// Async GET
const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json()
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }

  };

  document.getElementById('generate').addEventListener('click', performAction);

  function performAction(e){
   
    API_URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},us&appid=${API_KEY}`;
    // const favFact =  document.getElementById('favorite').value;
   
    retrieveData(API_URL)
    .then(function(data){
      // Add data
      console.log(data);
     // postData('/add', {temperature:data.main.temp, date: data.date, user_response:user_response} );
    })
    .then(
      updateUI()
    )
  }

// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};



  const updateUI = async () => {
    const request = await fetch('/receive');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = allData[0].temperature;
      document.getElementById('temp').innerHTML = allData[0].date;
      document.getElementById('content').innerHTML = allData[0].user_response;
  
    }catch(error){
      console.log("error", error);
    }
  }
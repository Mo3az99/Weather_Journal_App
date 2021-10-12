/* Global Variables */
const API_KEY = `cd21e1cbebc020db230d35b16e0cf2b3&units=metric`;
let API_URL =`https://api.openweathermap.org/data/2.5/weather?zip=90001,us&appid=${API_KEY}`;
 

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();
// const userInfo = document.getElementById('userInfo'); b3den



document.getElementById('generate').addEventListener('click', performAction);


// Async GET
const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
    // Transform into JSON
    const allData = await request.json();
    return allData; //return data
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };



  function performAction(e){
    const zip_code =  document.getElementById('zip').value;  
    const content = document.getElementById('feelings').value;
    API_URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code},us&appid=${API_KEY}`;
   try{
    retrieveData(API_URL)
    .then(function(data){
      // Add data
      // console.log(data.main.temp);
     postData('/add', {temperature: data.main.temp, date: date, content: content} );
    })
    .then(()=>{
      updateUI();
    });
  }
    catch(error){
      console.log(error);
      alert('The zip code is wrong. Please try again');
  }
  // userInfo.reset();  b3den
}
// Async POST
const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },// body data type must match "Content-Type" header    
    body: JSON.stringify({
      temp: data.temperature,
      date: data.date,
      content: data.content
  })     
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};



  const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      
      // console.log(allData);
      document.getElementById('date').innerHTML = allData.temp.toFixed(2)+ " C";
      document.getElementById('temp').innerHTML = allData.date ;
      document.getElementById('content').innerHTML = allData.content;
  
    }catch(error){
      console.log("error", error);
    }
  }
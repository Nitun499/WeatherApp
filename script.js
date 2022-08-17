const apiKey = 'e44a22eeead98964a415b66c25bba6fc';
let api;
const wrapper = document.querySelector('.wrapper');
const inputPart = document.querySelector('.input-part');
const infoTxt = document.querySelector('.info-text');
const inputField = document.querySelector('#inputfield');
const locationbtn = document.querySelector('button');
const maintempbox = document.querySelector('.numb');
const weatherdesc = document.querySelector('.weather');
const citycountry = document.querySelector('.city-country');
const feelslike = document.querySelector('.numb-2');
const humiditypara = document.querySelector('.humidity span');
const wIcon = document.querySelector("#iconimage");
const backbtn=document.querySelector(".wrapper i");
//  getting users location
locationbtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser doesn't support geolocation");
  }
});
const onSuccess = (position) => {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData(api);
};
const onError = (error) => {
  infoTxt.innerText = error.message;
  infoTxt.classList.add('error');
  console.log(error);
};
inputField.addEventListener('keyup', (e) => {
  if (e.key == 'Enter' && inputField.value != '') {
    requestApi(inputField.value);
  }
});
const requestApi = (cityname) => {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apiKey}`;
  infoTxt.innerText="Getting Weather details...";
  infoTxt.classList.add("pending");
  fetchData(api);
};
const fetchData = () => {
  fetch(api)
    .then((response) => response.json())
    .then((data) => weatherData(data))
    .catch((err) => console.log('Error: ', err));
};
const weatherData = (result) => {
  infoTxt.classList.replace("pending","error");
  // console.log(result);
  if (result.cod == '404') {
    infoTxt.innerText=`${inputField.value} isn't a valid cityName`;
    console.log(result.message);
  } else {


    infoTxt.classList.remove("pending","error");
    const city = result.name;
    const country = result.sys.country;
    const { description, id } = result.weather[0];
    const { feels_like, humidity, temp } = result.main;
    if(id==800){
      wIcon.src="icons/clear.svg";
    }else if(id>=200 && id<=232){
      wIcon.src="icons/strom.svg";
    }
    else if(id>=600 && id<=622){
      wIcon.src="icons/snow.svg";
    }
    else if(id>=701 && id<=781){
      wIcon.src="icons/haze.svg";
    }
    else if(id>=801 && id<=804){
      wIcon.src="icons/cloud.svg";
    }else if((id>=300 && id<=321)||(id>=500 && id<=532)){
      wIcon.src="icons/rain.svg";
    }
    //lets pass values to a particular element
    citycountry.innerText = `${city},${country}`;
    maintempbox.innerText = Math.floor(temp);
    weatherdesc.innerText = description;
    feelslike.innerText = Math.floor(feels_like);
    humiditypara.innerText = `${humidity}%`;
    wrapper.classList.add('active');

  }
  console.log(result);
};
backbtn.addEventListener("click",()=>{
  wrapper.classList.remove('active');
  inputField.value="";
})

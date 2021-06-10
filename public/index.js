//jshint esversion:6

const container = document.querySelector(".container");
const weatherDescription = document.getElementById("weatherdesc");

if (weatherDescription.innerHTML.includes("rain") === true) {
  container.classList.remove("cloudy");
  container.classList.remove("sunny");
  container.classList.remove("fog");
  container.classList.add("raining");
  container.classList.remove("clear");
} else if (weatherDescription.innerHTML.includes("cloud") === true) {
  container.classList.add("cloudy");
  container.classList.remove("sunny");
  container.classList.remove("fog");
  container.classList.remove("raining");
  container.classList.remove("clear");
} else if (weatherDescription.innerHTML.includes("sun") === true) {
  container.classList.remove("cloudy");
  container.classList.add("sunny");
  container.classList.remove("fog");
  container.classList.remove("raining");
  container.classList.remove("clear");
} else if (weatherDescription.innerHTML.includes("haze") === true || weatherDescription.innerHTML.includes("mist") === true) {
  container.classList.remove("cloudy");
  container.classList.remove("sunny");
  container.classList.add("fog");
  container.classList.remove("raining");
  container.classList.remove("clear");
} else if (weatherDescription.innerHTML.includes("clear") === true) {
  container.classList.remove("cloudy");
  container.classList.remove("sunny");
  container.classList.remove("fog");
  container.classList.remove("raining");
  container.classList.add("clear");
}


const swiper1 = new Swiper('.slide1', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.pagination1',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.next-slide1',
    prevEl: '.prev-slide1',
  },

});



const swiper2 = new Swiper('.slide2', {
  // Optional parameters
  loop: true,

  autoHeight: true,

  // If we need pagination
  pagination: {
    el: '.pagination2',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.next-slide2',
    prevEl: '.prev-slide2',
  },

});



const hourlycontainer = document.getElementById("hourly");
const dailyContainer = document.getElementById("daily");


const hourly = document.querySelector(".slide1");
const daily = document.querySelector(".slide2");

hourlycontainer.addEventListener("click", () => {

  daily.classList.add("notshowed");
  hourly.classList.remove("notshowed");

});


dailyContainer.addEventListener("click", () => {

  daily.classList.remove("notshowed");
  hourly.classList.add("notshowed");

});

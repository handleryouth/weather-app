//jshint esversion:6


let backgroundCover = [];

for (let i = 0; i < 6; i++) {
  let image = document.querySelectorAll(".background-cover")[i];
  backgroundCover.push(image);
}


const weatherDescription = document.getElementById("weatherdesc");

if (weatherDescription.innerHTML.includes("rain") === true) {
  for (let i = 0; i < backgroundCover.length; i++) {
    if (i === 3) {
      continue;
    } else {
      backgroundCover[i].classList.add("notshowed");
    }
  }

} else if (weatherDescription.innerHTML.includes("cloud") === true) {
  for (let i = 0; i < backgroundCover.length; i++) {
    if (i === 0) {
      continue;
    } else {
      backgroundCover[i].classList.add("notshowed");
    }
  }
} else if (weatherDescription.innerHTML.includes("sun") === true) {
  for (let i = 0; i < backgroundCover.length; i++) {
    if (i === 2) {
      continue;
    } else {
      backgroundCover[i].classList.add("notshowed");
    }
  }
} else if (weatherDescription.innerHTML.includes("haze") === true || weatherDescription.innerHTML.includes("mist") === true) {
  for (let i = 0; i < backgroundCover.length; i++) {
    if (i === 4) {
      continue;
    } else {
      backgroundCover[i].classList.add("notshowed");
    }
  }
} else if (weatherDescription.innerHTML.includes("clear") === true) {

  for (let i = 0; i < backgroundCover.length; i++) {
    if (i === 5) {
      continue;
    } else {
      backgroundCover[i].classList.add("notshowed");
    }
  }
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


const hourlycontainer = document.getElementById("hourly");
const dailyContainer = document.getElementById("daily");
const detailContainer = document.getElementById("detail");


const hourly = document.querySelector(".slide1");
const daily = document.querySelector(".slide2");
const detail  = document.querySelector(".slide3");

hourlycontainer.addEventListener("click", () => {

  daily.classList.add("notshowed");
  hourly.classList.remove("notshowed");
  detail.classList.add("notshowed");

});


dailyContainer.addEventListener("click", () => {

  daily.classList.remove("notshowed");
  hourly.classList.add("notshowed");
  detail.classList.add("notshowed");

});


detailContainer.addEventListener("click", () => {

  daily.classList.add("notshowed");
  hourly.classList.add("notshowed");
  detail.classList.remove("notshowed");

});

// VAWES SET
let allWaves_WhiteSpace = document.querySelector(".waves");

// WATER FLOW
let countPercents = document.getElementById("count");
let waterFlow = document.getElementById("water");
let remainedWater = document.getElementById("remained-water");
let percent = 0;

// FOR ADDING WATER

let currentWater = 0;
// creating goalWater variable with purpose to bind a value weather default or from server later
let goalWater;

// variables for binding to functions and transition through ajax
let remainedWaterValue;
let percentValue;

const bigCup = document.querySelector(".big-cup");
const waterInside = document.querySelector(".water-inside");

// //////////////////////////////////////

// SETTING USER WATER GOAL OR DEFAULT GOAL WHEN PAGE ONLOAD
$(window).on("load", function () {
  // console.log("HELLO");

  $.ajax({
    method: "POST",
    url: "/",
    contentType: "application/json",
    success: function (res) {
      if (res.serverResponse !== null) {
        $("#remained-water").html(`${res.serverResponse}L`);
        goalWater = res.serverResponse * 1000;
      } else if (res.serverResponse === null) {
        // first and as it turns main value of remained-water
        $("#remained-water").html(`2L`);
        // we multiplying by 1000 with purpose of correct calculation
        goalWater = 2 * 1000;
      }
    },
  });
});


// FOR BUTTONS; UPDATING PERCENTS AND WATER LEVEL; CALCULATING REMAINED

const addButton = document.querySelector(".btn-select.add");
const removeButton = document.querySelector(".btn-select.remove");

addButton.addEventListener("click", function () {
  // binding active element from carousel and get it's value
  let activeCarouselItem = document.querySelector(".carousel-item.active");
  // use destructuring
  let [mlAmount] = activeCarouselItem.textContent.trim().split(" ");
  let addWaterMl = Number(mlAmount);

  remainedWaterValue = updateWater(addWaterMl);
  percentValue = updatePercents(addWaterMl);
  // use ajax to transfer all the values at once + get them back and style the DOM

  $.ajax({
    method: "POST",
    url: "/",
    contentType: "application/json",
    data: JSON.stringify({
      remainedWater: remainedWaterValue,
      percent: percentValue,
    }),
    success: function (res) {
      if (
        res.remainedWaterResponse === undefined ||
        res.percentResponse === undefined
      ) {
        $("#remained-water").html(`2L`);
        $("#count").html(`0`);
      } else {
        $("#remained-water").html(`${res.remainedWaterResponse}L`);
        $("#count").html(`${res.percentResponse}`);
      }
    },
  });
});


removeButton.addEventListener("click", function () {
  let activeCarouselItem = document.querySelector(".carousel-item.active");
  let [mlAmount] = activeCarouselItem.textContent.trim().split(" ");
  // making negative number, because user wants to remove water
  let removeWaterMl = Number(-mlAmount);

  remainedWaterValue = updateWater(removeWaterMl);
  percentValue = updatePercents(removeWaterMl);

  $.ajax({
    method: "POST",
    url: "/",
    contentType: "application/json",
    data: JSON.stringify({
      remainedWater: remainedWaterValue,
      percent: percentValue,
    }),
    success: function (res) {
      if (
        res.remainedWaterResponse === undefined ||
        res.percentResponse === undefined
      ) {
        $("#remained-water").html(`2L`);
        $("#count").html(`0`);
      } else {
        $("#remained-water").html(`${res.remainedWaterResponse}L`);
        $("#count").html(`${res.percentResponse}`);
      }
    },
  });
});


function updateWater(waterMl) {
  currentWater += waterMl;
  let waterRemained;

  // ajax here passes data of remained water to the server

  if (currentWater > 0 && currentWater < goalWater) {
    waterRemained = (goalWater - currentWater) / 1000;
    // try to make it through ajax
    // remainedWater.innerText = `${(goalWater - currentWater) / 1000}L`;

    // $.ajax({
    //   method: "POST",
    //   url: "/",
    //   contentType: "application/json",
    //   data: JSON.stringify({remainedWater: (goalWater - currentWater) / 1000})
    // })
  } else if (currentWater >= goalWater) {
    waterRemained = 0;
    // remainedWater.innerText = `${0}L. Goal achieved!`;

    // $.ajax({
    //   method: "POST",
    //   url: "/",
    //   contentType: "application/json",
    //   data: JSON.stringify({remainedWater: 0})
    // })
  } else if (currentWater <= 0) {
    waterRemained = goalWater / 1000;

    // remainedWater.innerText = `${goalWater / 1000}L`;
    currentWater = 0;
    allWaves_WhiteSpace.style.height = `100vh`;

    // $.ajax({
    //   method: "POST",
    //   url: "/",
    //   contentType: "application/json",
    //   data: JSON.stringify({remainedWater: goalWater / 1000})
    // })
  }
  return waterRemained;
}


function updatePercents(waterMl) {
  // use ajax here to send percents to the server
  if (waterMl < 0 && percent < -((waterMl * 100) / goalWater)) {
    percent = 0;
    // countPercents.innerHTML = percent;
    waterFlow.style.transform = "translate(0" + "," + (100 - percent) + "%)";

    // $.ajax({
    //   method: "POST",
    //   url: "/",
    //   contentType: "application/json",
    //   data: JSON.stringify({percent: percent})
    // })
  } else {
    // if persents are not decimal, but floar, we Math.round them.
    percent += Math.round(Number((waterMl * 100) / goalWater));
    console.log(percent);
    // countPercents.innerHTML = percent;

    if (percent >= 0 && percent <= 100) {
      //   change the style of water by manipulation with percents
      waterFlow.style.transform = "translate(0" + "," + (100 - percent) + "%)";

      allWaves_WhiteSpace.style.height = `${100 - percent}vh`;

      // $.ajax({
      //   method: "POST",
      //   url: "/",
      //   contentType: "application/json",
      //   data: JSON.stringify({percent: percent})
      // })
    } else if (percent < 0) {
      percent = 0;
      // countPercents.innerHTML = percent;
      waterFlow.style.transform = "translate(0" + "," + (100 - percent) + "%)";

      // $.ajax({
      //   method: "POST",
      //   url: "/",
      //   contentType: "application/json",
      //   data: JSON.stringify({percent: percent})
      // })
    } else if (percent > 100) {
      waterFlow.style.transform = "translate(0, 0%)";

      // $.ajax({
      //   method: "POST",
      //   url: "/",
      //   contentType: "application/json",
      //   data: JSON.stringify({percent: percent})
      // })
    }
  }
  return percent;
}

// /////////////////////////////////////

// CREATING BUBBLES
function createBubble() {
  const underWater = document.querySelector(".under-water");
  // creates new span element
  const createElement = document.createElement("span");
  // choose size and set width and height
  var size = Math.floor(Math.random() * 60);
  createElement.style.width = 20 + size + "px";
  createElement.style.height = 20 + size + "px";

  /* The read-only Window property innerWidth returns the interior width of the window in pixels. 
    This includes the width of the vertical scroll bar, if one is present. */
  createElement.style.left = Math.random() * innerWidth + "px";
  underWater.appendChild(createElement);

  setTimeout(() => {
    createElement.remove();
  }, 7000);
}
setInterval(createBubble, 900);

// //////////////////////////////////////

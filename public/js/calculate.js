

// For Bubbles
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

// $(".calculate-box-2 img").style.width = 100%

$(document).ready(function () {
  $("#calculateWaterGoal").on("submit", function (event) {
    // to prevent refreshing of the page
    event.preventDefault();
    // let userAge = Number($("#user-age").val());
    let userWeight = Number($("#user-weight").val());
    let userActivity = Number($("#user-activity").val());
    let userWaterGoal;

    // check if statement
    if ($("#male").is(":checked")) {
      // use water formula for males
      console.log("Male");
      userWaterGoal = (userWeight * 0.04) + (userActivity * 0.6);
    } else if ($("#female").is(":checked")) {
      // use water formula for males
      console.log("Female");
      userWaterGoal = (userWeight * 0.03) + (userActivity * 0.4);
    }

    // $("#user-goal").html(`Your Goal: <span name="userWaterGoal">${userWaterGoal.toFixed(1)}</span>L`);

    // ajax here for binding script to server
    $.ajax({
      method: "POST",
      url: "/calculate",
      contentType: "application/json",
      data: JSON.stringify({userWaterGoal: userWaterGoal.toFixed(1)}),
      success: function (res) {
        $("#user-goal").html(`Your Goal: <span name="userWaterGoal">${res.serverResponse}</span>L`);
      }
    });

  });
});

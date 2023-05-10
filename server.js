const express = require("express");
// const mongoose = require("mongoose");

const app = express();
const port = 3000;

// To detect calculated water goal
let userWaterGoal;

// with purpose to use inside DB
// let remainedWaterDB;
// let percentDB;

// for POSTing information that we get from form
// app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* 
To be able to open files bundled to html, such as css or images. We place them in folder public 
But we specify path to our images or css without declaring "public" folder. 
Like this "images/sign-up.png" or "css/style.css"
*/
app.use(express.static("public"));

// Create new DB inside MongoDB.
// mongoose.connect("mongodb://127.0.0.1/watergoalDB", { useNewUrlParser: true });
/* DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
(Use `node --trace-deprecation ...` to show where the warning was created)
 */
// mongoose.set("strictQuery", true);

// Mongoose Schema and Mongoose Model(Ususally capitalised)
// const waterSchema = new mongoose.Schema({
//   name: String,
//   remainedWater: Number,
//   percent: Number,
// });
// const Water = mongoose.model("Water", waterSchema);

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");

  // Looking for Model Collection Water in DB
  // Water.findOne({ name: "waterGoal" }, function (err, foundItem) {
  //   if (!err) {
  //     if (!foundItem) {
  //       /* if no item exists (or it was deleted) we create new one and redirect to "/" again
  //       CREATE NEW MONGOOSE DOCUMENT 
  //       Create Item with default data everytime server started with no items inside Water collection
  //       or just after "/remove" command and redirect here again */

  //       const dailyWaterProgress = new Water({
  //         name: "waterGoal",
  //         remainedWater: 2,
  //         percent: 0,
  //       });

  //       //  To save into Water collection
  //       dailyWaterProgress.save();
  //       // redirect to this page again to show newly created item dailyWaterProgress
  //       response.redirect("/");
  //     }
  //   }
  // });
});

app.post("/", function (request, response) {
  // send water goal to the main page
  // working just when all the ajax variables are in one json
  // not work when I use different response.send()/response.write() statements

  response.send({
    serverResponse: Number(userWaterGoal),
    remainedWaterResponse: request.body.remainedWater,
    percentResponse: request.body.percent,
  });

  /*  data in database will be recognised as Number, 
so we need to change data we get from ajax with JSON.stringify into Number*/
  // Water.findOneAndUpdate(
  //   { name: "waterGoal" },
  //   {
  //     remainedWater: Number(request.body.remainedWater),
  //     percent: Number(request.body.percent),
  //   },
  //   // !! THIS FUNCTION MUST BE HERE IF WE WANT TO UPDATE AND SHOW THIS UPDATE
  //   function (err, foundItem) {
  //     if (!err) {
  //       console.log("Updated");
  //     }
  //   }
  // );

  // Water.findOne({ name: "waterGoal" }, function (err, foundItem) {
  //   remainedWaterDB = foundItem.remainedWater;
  //   percentDB = foundItem.percent;
  //   response.send({
  //     serverResponse: Number(userWaterGoal),
  //     remainedWaterResponse: remainedWaterDB,
  //     percentResponse: percentDB,
  //   });
  // });

  

  // binding values to variable after first loading
  // remainedWater = request.body.remainedWater;
  // percent = request.body.percent;

  /*when first time loading server we don't get undefined in the "percent" field or in other fields
     because we used html to declare default variables 
     Further I can overwrite this using js and ajax and if statement*/

  // let remainedWater = request.body.remainedWater;
  // let percent = request.body.percent;

  // testing by log to console

  console.log(`${userWaterGoal} user water goal`);
  console.log(`${request.body.remainedWater} remained water`);
  console.log(`${request.body.percent}%`);
  console.log("HELLO");

  // response.send({remainedWaterResponse: request.body.remainedWater, percentResponse: request.body.percent});
  // response.send();
});

app.get("/calculate", function (request, response) {
  response.sendFile(__dirname + "/calculate.html");
});

app.post("/calculate", function (request, response) {
  response.send({ serverResponse: request.body.userWaterGoal });
  // bind caclulated water goal to the variable with the pupropse to use it later to send in "/"
  userWaterGoal = request.body.userWaterGoal;
});

app.get("/remove", function (request, response) {
  // try to remove items from model collection
  // Water.remove({}, function (err) {
  //   if (err) {
  //     console.log(err);
  //   } else if (!err) {
  //     console.log("collection removed");
  //     // and redirect on the main page "/" again
  //     response.redirect("/");
  //   }
  // });
  response.redirect("/");
});

app.listen(port, function () {
  console.log("Server is working on port 3000");
});

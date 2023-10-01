const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv").config();

//#1
console.log("Hello Word");

//#2
// app.get("/", (req, res) => {
//   res.send("Hello Express")
// })

//#4
app.use("/public", express.static(__dirname + "/public"));

//#7

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
})

//#3
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

//#5
// app.get("/json", (req, res) => {
//   res.json({ "message": "Hello json" });
// });

//#6
app.get("/json", (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message });
});

//#8

app.get("/now", (req, res, next) => {
    // adding a new property to req object
    // in the middleware function
    req.time = new Date().toString();
    next();
  }, (req, res) => {
    // accessing the newly added property
    // in the main function
    res.send({
      time: req.time,
    });
  }
);

//#9

app.get("/:word/echo", (req, res) => {
  res.json({
    echo: req.params.word
  });
});

//#10

app.get("/name", (req, res) => {
  res.json({
    name: req.query.first + " " + req.query.last
  });
});

//#11

app.use(bodyParser.urlencoded({ extended: false }));

//#12

app.post("/name", (req, res) => {
  res.json({
    name: req.body.first + " " + req.body.last
  });
});

// app.use(bodyParser);











module.exports = app;

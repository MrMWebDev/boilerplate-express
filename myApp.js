let express = require('express');
let app = express();
let dotenv = require('dotenv').config();

console.log("Hello World");

app.use(requestLogger)

function requestLogger(req, res, next) {
    // Get method, path, and IP address from the request object
    const method = req.method;
    const path = req.path;
    const ip = req.ip;
  
    // Log the request information
    console.log(`${method} ${path} - ${ip}`);
  
    // Call next() to continue with the request-response cycle
    next();
  }

// Normal usage
app.use(express.static(__dirname + "/public"));

// Assets at the /public route
app.use("/public", express.static(__dirname + "/public"));

app.get('/json', function(req, res) {
    // res.json({
    //     message: "Hello json"
    //   });
    let message = 'Hello json';

    if (process.env.MESSAGE_STYLE === 'uppercase') {
        message = message.toUpperCase();
    }

    res.json({ message });
});

app.get("/now", (req, res, next) => {
      // adding a new property to req object
      // in the middleware function
        req.time = new Date().toString();
        next();
    },

    (req, res) => {
      // accessing the newly added property
      // in the main function
        res.send({
            time: req.time
        });
    }
);

app.get(":/world/echo", req, res => {
    res.json({ someWorld: req.params.world })
});


module.exports = app;

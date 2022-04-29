const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
const {publicVapidKey, privateVapidKey} = require("./config");
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());


webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);
const subscriptions = {};
let i = 1;
setInterval(() => {
  console.log("push message ---"+ JSON.stringify(subscriptions));
  Object.values(subscriptions).forEach(subscription => {
    // Pass object into sendNotification
  webpush
    .sendNotification(subscription, JSON.stringify({ "title": "Push Test ...", "body": "hello world!"+ i++ }))
    .catch(err => console.error(err))
  });
} , 10000);
// Subscribe Route
app.get("/null", (req, res)=> {
  res.status(200).json({});
});
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({"hello":"world"});

  // Create payload
  subscriptions[subscription.endpoint] = subscription;
});

module.exports={publicVapidKey, privateVapidKey}
// const port = 5000;
// app.listen(port, () => console.log(`Server started on port ${port}`));

const port = 443;
const https = require('https');
const server = https.createServer({key: key, cert: cert }, app).listen(port, () => console.log(`Server started on port ${port}`));

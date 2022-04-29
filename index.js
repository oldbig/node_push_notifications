const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require('fs');
const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

// const publicVapidKey =
//   "BJa5H_wou1FNndkcC5ErdA3PoO9PmeSc7S9P2vS-wHkZL4GIanpb9m2jv9GryFxhbaDsnjAW6GZEEBOyvWS4ZY8";
// const privateVapidKey = "96KmP2UWtxX7fzUsVLS_dmJnamAgzmqSsWhXYI8Ng2M";

const publicVapidKey =
  "BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";
const privateVapidKey = "3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM";

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


// const port = 5000;
// app.listen(port, () => console.log(`Server started on port ${port}`));

const port = 443;
const https = require('https');
const server = https.createServer({key: key, cert: cert }, app).listen(port, () => console.log(`Server started on port ${port}`));

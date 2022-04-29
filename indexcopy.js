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
let i = 1;
const subscription ={"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABiaz3D64FitUh3uzNwEVn4Z6VnZVS2p86FeRO8IN4aAnC6Kfog7uKqWudzJsAS8bYq4H_Eq2eKw3Y8FxORKCiC1h0W2TWdXwO5xUokCq04JQs9tQ1SkHgjyVer_bWw7be39IF7AKbo6h9cqsaiQykFTbmyG4l1ATOSJKFHmlLMDhFZa3c","expirationTime":null,"keys":{"auth":"Ss6aWo15xDBO3bhY4Zf2jw","p256dh":"BABdwVGNvxzi4Y_Lt9oldvKmfKYntt0t7X6Qrbf-sRQRnd08RkGRdxE7MH0MydVDFFUTGwt-nkbby9vMQfAACRQ"}};
webpush
.sendNotification(subscription, JSON.stringify({ "title": "Push Test ...", "body": "hello world!"+ i++ })).catch(e=>console.error(e))

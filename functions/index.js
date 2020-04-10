const functions = require('firebase-functions')
const express = require('express')
const { Nuxt } = require('nuxt')
const app = express()
const admin=require ('firebase-admin')
const cors = require('cors')({
  origin: true
});
const cookieparser = require('cookieparser')

admin.initializeApp(functions.config().firebase);

exports.verifySession = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    try {

      console.log("VERIFYYING ON SERVER");
      let cookies = req.headers.cookie

      const parsed=cookieparser.parse(req.headers.cookie)
      const session = parsed.__session

      // console.log(data,cookie);
      // let sessionCookie=req.headers.cookie
      admin.auth().verifySessionCookie(session,true)
      .then((decodedClaims) => {
        console.log(decodedClaims);
        res.status(200).send(decodedClaims)
      })
      .catch(error => {
        // Session cookie is unavailable or invalid. Force user to login.
        console.log('NO SESSION', error);
        res.status(200).send()
        // res.redirect('/login');
      });
      // res.end(JSON.stringify({status: 'success'}));

    } catch (e) {
      console.log(e);
      res.status(401).send('UNAUTHORIZED REQUEST!');


    }
  })
})
exports.setsession = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    try {

      let data = JSON.parse(req.body)
      // console.log(data.token);
      const daysValid=14
      const expiresIn = 60 * 60 * 24 * daysValid * 1000;//Expires in 100 days
      // Create the session cookie. This will also verify the ID token in the process.
      // The session cookie will have the same claims as the ID token.
      // To only allow session cookie setting on recent sign-in, auth_time in ID token
      // can be checked to ensure user was recently signed in before creating a session cookie.
      admin.auth().createSessionCookie(data.token, {expiresIn})
        .then((sessionCookie) => {
         // Set cookie policy for session cookie.
         // console.log(sessionCookie);
         const options = {maxAge: daysValid, httpOnly: true, secure: true};
         res.cookie('session', sessionCookie, options);
         data={
           sessionCookie:sessionCookie,
           options:options,
         }

         res.status(200).send(data)
         // res.end(JSON.stringify({status: 'success'}));
       })
      .catch(error => {
        console.log(error);
        res.status(401).send('UNAUTHORIZED REQUEST!');
      });
    } catch (e) {
      console.log(e);
      res.status(401).send()
    }
  })
})

// Import and Set Nuxt.js options
const config = {
  dev: false,
  buildDir: 'nuxt'
}

// Init Nuxt.js

const nuxt = new Nuxt(config)

app.use(async (req, res) => {
  await nuxt.ready()
  nuxt.render(req, res)
})



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.nuxtApp = functions.https.onRequest(app)
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

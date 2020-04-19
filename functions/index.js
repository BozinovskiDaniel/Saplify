const functions = require('firebase-functions');

var admin = require("firebase-admin");

var serviceAccount = require("./saplify-48591-87f9ad72d7c4.json");

const express = require('express');
const app = express();

var config = {
    apiKey: "AIzaSyA1avcmxY0Z8vLNWTRQkeuEY5LTG4Xd3oA",
    authDomain: "saplify-48591.firebaseapp.com",
    databaseURL: "https://saplify-48591.firebaseio.com",
    projectId: "saplify-48591",
    storageBucket: "saplify-48591.appspot.com",
    messagingSenderId: "427045407305",
    appId: "1:427045407305:web:aa7b95c22321842c5b4d98",
    measurementId: "G-MEBH7PFJ58"
  };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://saplify-48591.firebaseio.com"
});

const firebase = require('firebase');
firebase.initializeApp(config)

app.get('/screams', (req, res) => {

    admin.firestore().collection('screams').orderBy('createdAt', 'desc').get()
    .then(data => {
        let screams = [];
        data.forEach(doc => {
            screams.push({
                screamId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(screams);
    })
    .catch(err => console.error(err))

});

app.post('/scream', (req, res) => {

    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    }

    admin.firestore()
        .collection('screams')
        .add(newScream)
        .then(doc => {
            res.json({ message: `document ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).json({error: 'something went wrong'});
            console.error(err);
        })

});

// Helper methods
const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    if (email.match(regEx)) return true;
    else return false;
}

app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    }

    let errors = {}
    // Validate data
    if (isEmpty(newUser.email)) {
        errors.email = 'Must not be empty';
    } else if (!isEmail(newUser.email)) {
        errors.email = 'Must be a valid email address';
    }

    if (isEmpty(newUser.password)) errors.password = 'Must not be empty';
    if(newUser.password != newUser.confirmPassword) errors.confirmPassword = 'Passwords must match';
    if (isEmpty(newUser.handle)) errors.handle = 'Must not be empty';

    if (Object.keys(errors).length > 0) return res.status(400).json(errors)

    let token, userId;
    admin.firestore().doc(`/users/${newUser.handle}`).get()
    .then(doc => {
        if (doc.exists) {
            return res.status(400).json({ handle:' this handle is already taken' })
        } else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        }
    })
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idToken) => {
        token = idToken;
        const userCredentials = {
            handle: newUser.handle,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId
        };
        return admin.firestore().doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
        return res.status(201).json({ token });
    })
    .catch(err => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
            return res.status(400).json({ email: "Email is already in use"});
        } else {
            return res.status(500).json({ error: err.code });
        }
    })
    
});

app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    let errors = {};
    if (isEmpty(user.email)) errors.email = 'Must not be empty';
    if (isEmpty(user.password)) errors.password = 'Must not be empty';

    if (Object.keys(errors).length > 0) return res.status(400).json(errors)

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({ token });
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/wrong-password') return res.status(403).json({ general: 'Wrong credentials, please try again' });
            else return res.status(500).json({ error: err.code });
        })
})

exports.api = functions.https.onRequest(app);
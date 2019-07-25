const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

let serviceAccount = require('../../klucz.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projekt-studia.firebaseio.com"
});

const config = {
    apiKey: "AIzaSyDSjWnewUcIvhWAPIYyO-M85Je2BRspcmI",
    authDomain: "projekt-studia.firebaseapp.com",
    databaseURL: "https://projekt-studia.firebaseio.com",
    projectId: "projekt-studia",
    storageBucket: "projekt-studia.appspot.com",
    messagingSenderId: "1039506594214",
    appId: "1:1039506594214:web:33f7cb7c2fa90e9d"
};

const db = admin.firestore();

const firebase = require('firebase');
firebase.initializeApp(config);

app.get('/orders', (req,res) => {
    if(req.method !== 'GET'){
        return res.status(400).json({error: "Niedozwolona metoda"});
    }
    admin
        .firestore()
        .collection('screams')
        .get()
        .then(data => {
            let screams = [];
            data.forEach((doc) => {
                screams.push(doc.data());
            });
            return res.json(screams);
        })
        .catch(err => console.error(err));
});

app.post('/order', (req,res) => {
    if(req.method !== 'POST'){
        return res.status(400).json({error: "Niedozwolona metoda"});
    }
    const newScream = {
        body: req.body.body,
        title: req.body.title,
        deadline: req.body.deadline,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };
    admin
        .firestore()
        .collection('screams')
        .add(newScream)
        .then((doc) =>{
            res.json({message: 'stworzono pomyslnie'})
        })
        .catch((err) =>{
            res.status(500).json({error: 'blad'});
            console.error(err);
        });
});

//Rejestracja

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(regEx)) return true;
    else return false;
};

const isZip = (zip) => {
    const regEx = /^[0-9]{2}(?:-[0-9]{3})?$/;
    if(zip.match(regEx)) return true;
    else return false;
};

const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
};

app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        name: req.body.name,
        surname: req.body.surname,
        company: req.body.company,
        city: req.body.city,
        province: req.body.province,
        zip: req.body.zip,
        type: "basic",
        salary: "Brak Danych",
        performance: "Brak Danych",
        role: "Admin",
        admin: "Admin",
        handle: req.body.handle,
    };

    let errors = {};
    if(isEmpty(newUser.email)){
        errors.email = 'Email nie może być pusty';
    } else if (!isEmail(newUser.email)){
        errors.email = 'Błędny adres email';
    }

    if(isEmpty(newUser.password)) errors.password = 'Pole nie może być puste';
    if(newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'Hasła nie pasują do siebie';

    if(isEmpty(newUser.name)) errors.name = 'Pole nie może być puste';

    if(isEmpty(newUser.surname)) errors.surname = 'Pole nie może być puste';

    if(isEmpty(newUser.company)) errors.company = 'Pole nie może być puste';

    if(isEmpty(newUser.city)) errors.city = 'Pole nie może być puste';

    if(isEmpty(newUser.province)) errors.province = 'Pole nie może być puste';

    if(isEmpty(newUser.zip)) {
        errors.zip = 'Nie może być puste';
    } else if(!isZip(newUser.zip)){
        errors.zip = 'Blędnie wpisany zip';
    }

    if(isEmpty(newUser.handle)) errors.handle = 'Nie może być puste';

    if(Object.keys(errors).length > 0) return res.status(400).json(errors);

    let token, userId;
    db.doc(`/users/${newUser.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({handle: 'Juz istnieje'})
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newUser.email, newUser.password);
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
                name: newUser.name,
                surname: newUser.surname,
                company: newUser.company,
                city: newUser.city,
                province: newUser.province,
                zip: newUser.zip,
                type: newUser.type,
                salary: newUser.salary,
                performance: newUser.salary,
                role: newUser.admin,
                userId
            };
            db.doc(`/users/${newUser.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({token});
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({email: 'Email jest już w użyciu'});
            } else {
                return res.status(500).json({error: err.code});
            }
        })

});

//admin tworzący usera
app.post( '/user', (req, res) => {
  const newWorker = {
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      name: req.body.name,
      surname: req.body.surname,
      company: "Brak",
      city: req.body.city,
      province: req.body.province,
      zip: req.body.zip,
      type: "Brak",
      salary: req.body.salary,
      performance: req.body.performance,
      role: "Worker",
      admin: req.body.admin,
      handle: req.body.handle,
  }

    let errors = {};
    if(isEmpty(newWorker.email)){
        errors.email = 'Email nie może być pusty';
    } else if (!isEmail(newWorker.email)){
        errors.email = 'Błędny adres email';
    }

    if(isEmpty(newWorker.password)) errors.password = 'Pole nie może być puste';
    if(newWorker.password !== newWorker.confirmPassword) errors.confirmPassword = 'Hasła nie pasują do siebie';

    if(isEmpty(newWorker.name)) errors.name = 'Pole nie może być puste';

    if(isEmpty(newWorker.surname)) errors.surname = 'Pole nie może być puste';

    if(isEmpty(newWorker.city)) errors.city = 'Pole nie może być puste';

    if(isEmpty(newWorker.province)) errors.province = 'Pole nie może być puste';

    if(isEmpty(newWorker.zip)) {
        errors.zip = 'Nie może być puste';
    } else if(!isZip(newWorker.zip)){
        errors.zip = 'Blędnie wpisane dane';
    }

    if(isEmpty(newWorker.salary)) {
        errors.salary = 'Nie może być puste';
    } else if(isNaN(newWorker.salary)){
        errors.salary = 'Blędnie wpisane dane';
    } else if(newWorker.salary < 0){
        errors.salary = 'Blędnie wpisane dane';
    }

    if(isEmpty(newWorker.performance)) {
        errors.performance = 'Nie może być puste';
    } else if(isNaN(newWorker.performance)){
        errors.performance = 'Blędnie wpisane dane';
    } else if(newWorker.performance < 0 || newWorker.performance > 100){
        errors.performance = 'Zła liczba. Zakres to 0-100';
    }

    if(isEmpty(newWorker.admin)) errors.admin = 'Nie może być puste';

    if(isEmpty(newWorker.handle)) errors.handle = 'Nie może być puste';

    if(Object.keys(errors).length > 0) return res.status(400).json(errors);

    let token, userId;
    db.doc(`/workers/${newWorker.handle}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({handle: 'Juz istnieje'})
            } else {
                return firebase
                    .auth()
                    .createUserWithEmailAndPassword(newWorker.email, newWorker.password);
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                handle: newWorker.handle,
                email: newWorker.email,
                createdAt: new Date().toISOString(),
                name: newWorker.name,
                surname: newWorker.surname,
                city: newWorker.city,
                province: newWorker.province,
                salary: newWorker.salary,
                performance: newWorker.performance,
                admin: newWorker.admin,
                userId
            };
            db.doc(`/workers/${newWorker.handle}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({token});
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({email: 'Email jest już w użyciu'});
            } else {
                return res.status(500).json({error: err.code});
            }
        })
});

app.post('/login', (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    let errors = {};

    if(isEmpty(user.email)) errors.email = 'Pole nie może być puste';
    if(isEmpty(user.password)) errors.password = 'Pole nie może być puste';

    if(Object.keys(errors).length >0) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token =>{
            return res.json({token});
        })
        .catch(err => {
            console.error(err);
            if(err.code === 'auth/wrong-password'){
                return res.status(403).json({general: "Zły login lub hasło, proszę spróbuj ponownie"});
            }
            if(err.code === 'auth/user-not-found'){
                return res.status(403).json({general: "Zły login lub hasło, proszę spróbuj ponownie"});
            }
            return res.status(500).json({error: err.code});
        })
});

exports.api = functions.https.onRequest(app);

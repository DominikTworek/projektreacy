const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const {getAllOrders, postOneOrder, getAdminOrders} = require('./handlers/orders');
const {signup, login, uploadImage} = require('./handlers/users');
const {newWorker} = require('./handlers/workers');

//Zlecenia funkcje
app.get('/orders', FBAuth, getAllOrders); //wyswietlanie wszystkich zleceń
app.post('/order', FBAuth, postOneOrder); //dodawanie zlecenia
app.post('/aorder', FBAuth, getAdminOrders); //dodawanie zlecenia

//uzytkownicy funkcje
app.post('/signup', signup);
app.post('/login', login);
app.post('/image', FBAuth, uploadImage);

//admin tworzący usera
app.post('/worker', FBAuth, newWorker);

exports.api = functions.https.onRequest(app);

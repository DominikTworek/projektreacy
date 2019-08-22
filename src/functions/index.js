const functions = require('firebase-functions');
const cors = require('cors');

const app = require('express')();

app.use(cors());

const FBAuth = require('./util/fbAuth');

const {getAllOrders, postOneOrder, getAdminOrders, getOrder, workerOnOrder, deleteOrder} = require('./handlers/orders');
const {signup, login, uploadImage, addUserDetails, getUserDetails} = require('./handlers/users');
const {newWorker} = require('./handlers/workers');

//Zlecenia funkcje
app.get('/orders', getAllOrders); //wyswietlanie wszystkich zleceń
app.post('/order', FBAuth, postOneOrder); //dodawanie zlecenia
app.get('/aorder', FBAuth, getAdminOrders); //pobieranie wszystkich zleceć dla uzytkownika
app.get('/order/:orderId', FBAuth, getOrder); //pobieranie jednego zlecenia
app.post('order/:screamID/worker', FBAuth, workerOnOrder); //dodawanie pracownika do zlecenia ręcznie
app.delete('order/:orderId', FBAuth, deleteOrder);

//uzytkownicy funkcje
app.post('/signup', signup); //rejestracja
app.post('/login', login); //logowanie
app.post('/image', FBAuth, uploadImage); //dodawanie zdjecia
app.post('/edit', FBAuth, addUserDetails); //edycja danych uzytkownika
app.get('/get', FBAuth, getUserDetails); //pobieranie danych uzytkownika

//admin tworzący usera
app.post('/worker', FBAuth, newWorker);

exports.api = functions.https.onRequest(app);

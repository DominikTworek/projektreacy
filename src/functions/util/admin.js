const admin = require('firebase-admin');

let serviceAccount = require('../klucz');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://projekt-studia.firebaseio.com"
});

const db = admin.firestore();

module.exports = {admin,db};
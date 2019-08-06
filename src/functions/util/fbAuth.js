const {admin, db} = require('./admin');

module.exports = (req, res, next) => {
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else {
        console.error('Brak tokenu');
        return res.status(403).json({error: 'Nieautoryzowany'});
    }
    admin.auth().verifyIdToken(idToken)
        .then(dekodowanieTokenu => {
            req.user = dekodowanieTokenu;
            console.log(dekodowanieTokenu);
            return db
                .collection('users')
                .where('userId', '==', req.user.uid)
                .limit(1)
                .get();
        })
        .then(data => {
            req.user.handle = data.docs[0].data().handle;
            return next();
        })
        .catch(err => {
            console.error('Błąd przy weryfikacji tokenu', err);
            return res.status('403').json(err);
        })
};
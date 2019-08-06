const {db} = require('../util/admin');
const {validateWorkerData} = require('../util/validators');
const {firebase} = require('../util/firebase');

exports.newWorker =  (req, res) => {
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
        admin: req.user.handle,
        handle: req.body.handle,
    }

    const {valid, errors} = validateWorkerData(newWorker);
    if(!valid) return res.status(400).json(errors);

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
                zip: newWorker.zip,
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
};
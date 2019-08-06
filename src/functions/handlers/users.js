const {db, admin} = require('../util/admin');
const {firebase} = require('../util/firebase');
const config = require('../util/config');

const {validateSignUpData, validateLoginData} = require('../util/validators');

exports.signup = (req, res) => {
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

    const {valid, errors} = validateSignUpData(newUser);
    if (!valid) return res.status(400).json(errors);

    const noImage = 'user.png';

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
                imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
                    config.storageBucket
                    }/o/${noImage}?alt=media`,
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
};

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const {valid, errors} = validateLoginData(user);
    if (!valid) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({token});
        })
        .catch(err => {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
                return res.status(403).json({general: "Zły login lub hasło, proszę spróbuj ponownie"});
            }
            if (err.code === 'auth/user-not-found') {
                return res.status(403).json({general: "Zły login lub hasło, proszę spróbuj ponownie"});
            }
            return res.status(500).json({error: err.code});
        })
};

exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({ headers: req.headers });

    let imageToBeUploaded = {};
    let imageFileName;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname, file, filename, encoding, mimetype);
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({ error: 'Błędne zdjęcie' });
        }
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(
            Math.random() * 1000000000000
        ).toString()}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', () => {
        admin
            .storage()
            .bucket()
            .upload(imageToBeUploaded.filepath, {
                resumable: false,
                metadata: {
                    metadata: {
                        contentType: imageToBeUploaded.mimetype
                    }
                }
            })
            .then(() => {
                const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
                    config.storageBucket
                    }/o/${imageFileName}?alt=media`;
                return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
            })
            .then(() => {
                return res.json({message: 'Zdjęcie zostało poprawnie dodane'});
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({error: err.code});
            });
    });
    busboy.end(req.rawBody);
};
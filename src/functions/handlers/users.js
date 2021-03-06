const {db, admin} = require('../util/admin');
const {firebase} = require('../util/firebase');
const config = require('../util/config');

const {validateSignUpData, validateLoginData, reduceUserDetails, validatePasswordData, validateEmail} = require('../util/validators');

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
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
                type: "Basic",
                role: "Admin",
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
                return res.status(500).json({general: 'Coś poszło nie tak, spróbuj ponownie'});
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

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({token});
        })
        .catch(err => {
            console.error(err);
            return res
                .status(403)
                .json({general: "Zły login lub hasło, proszę spróbuj ponownie"});
        });
};

exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);
    db.doc(`/users/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.json({message: 'Dane zostały poprawnie dodane'})
        })
        .catch(err => {
            console.log(err);
            return res.stack(500).json({error: err.code});
        })
};

exports.forgetUserPassword = (req, res) => {
    const email = {
        email: req.body.email
    };

    const {valid, errors} = validateEmail(email);
    if (!valid) return res.status(400).json(errors);

    firebase.auth().sendPasswordResetEmail(email.email)
        .then(() => {
            return res.json({message: 'Hasło zostało poprawnie wysłane na @'})
        })
        .catch(err => {
            console.error(err);
            return res
                .status(403)
                .json({general: "Ten Email nie istnieje w naszej bazie"});
        });
};

exports.changeUserPassword = (req, res) => {
    let uid = req.user.uid;
    const pass = {
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    const {valid, errors} = validatePasswordData(pass);
    if (!valid) return res.status(400).json(errors);

    admin.auth().updateUser(uid, {password: pass.password})
        .then(() => {
            return res.json({message: 'Hasło zostało poprawnie zmienione'})
        })
        .catch(err => {
            console.log(err);
            return res.stack(500).json({error: err.code});
        })
};


exports.changeNormal = (req, res) => {
    var datee = new Date();
    datee.setDate(datee.getDate() + 31);
    db.doc(`/users/${req.user.handle}`).update({
        type: 'Normal',
        timePremium: datee.toISOString()
    })
        .then(() => {
            return res.json({message: 'Konto zmieniło status na Normal'})

        })
        .catch(err => {
            console.log(err);
            return res.stack(500).json({error: err.code});
        })
};

exports.changePro = (req, res) => {
    var datee = new Date();
    datee.setDate(datee.getDate() + 31);
    db.doc(`/users/${req.user.handle}`).update({
        type: 'Pro',
        timePremium: datee.toISOString()
    })
        .then(() => {
            return res.json({message: 'Konto zmieniło status na Pro'})

        })
        .catch(err => {
            console.log(err);
            return res.stack(500).json({error: err.code});
        })
};

exports.checkPremium = (req, res) => {
    var datee = new Date().toISOString();
    db.doc(`/users/${req.user.handle}`)
        .get()
        .then(() => {
                db
                    .collection('users')
                    .where('handle', '==', req.user.handle)
                    .where('timePremium', '>', datee)
                    .get()
                    .then(data => {
                        let premiums = [];
                        data.forEach((doc) => {
                            premiums.push(doc.data());
                        });
                        if (premiums.length === 0) {
                            db.doc(`/users/${req.user.handle}`).update({
                                type: 'Basic',
                                timePremium: ''
                            })
                                .then(() => {
                                    return res.json({message: 'Test'});
                                })
                                .catch(err => {
                                    console.log(err);
                                    return res.status(500).json({error: err.code});
                                });
                        } else {
                            return res.status(200).json('Premium Aktualne');
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return res.stack(500).json({error: err.code});
                    });
        });
};

exports.getUserDetails = (req, res) => {
    var datee = new Date().toISOString();
    db.doc(`/users/${req.user.handle}`)
        .get()
        .then(() => {
            db
                .collection('users')
                .where('handle', '==', req.user.handle)
                .where('timePremium', '>', datee)
                .get()
                .then(data => {
                    let premiums = [];
                    data.forEach((doc) => {
                        premiums.push(doc.data());
                    });
                    if (premiums.length === 0) {
                        db.doc(`/users/${req.user.handle}`).update({
                            type: 'Basic',
                            timePremium: ''
                        })
                            .then(() => {
                                return res.json({message: 'Test'});
                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(500).json({error: err.code});
                            });
                    } else {
                        return res.status(200).json('Premium Aktualne');
                    }
                })
                .catch(err => {
                    console.log(err);
                    return res.stack(500).json({error: err.code});
                });
        });
    let userData = {};
    db.doc(`/users/${req.user.handle}`).get()
        .then((doc) => {
            if (doc.exists) {
                userData.credentials = doc.data();
                return db
                    .collection('workers')
                    .where('userHandle', '==', req.user.handle).get();
            }
        })
        .then((data) => {
            userData.workers = [];
            data.forEach((doc) => {
                userData.workers.push(doc.data());
            });
            return res.json(userData);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({error: err.code});
        });
};

exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({headers: req.headers});

    let imageToBeUploaded = {};
    let imageFileName;

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        console.log(fieldname, file, filename, encoding, mimetype);
        if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
            return res.status(400).json({error: 'Błędne zdjęcie'});
        }
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        imageFileName = `${Math.round(
            Math.random() * 1000000000000
        ).toString()}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = {filepath, mimetype};
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
                return db.doc(`/users/${req.user.handle}`).update({imageUrl});
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
const {db, admin} = require('../util/admin');

exports.getAllOrders =  (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).json({error: "Niedozwolona metoda"});
    }
    db
        .collection('orders')
        .get()
        .then(data => {
            let screams = [];
            data.forEach((doc) => {
                screams.push(doc.data());
            });
            return res.json(screams);
        })
        .catch(err => console.error(err));
};

exports.getAdminOrders =  (req, res) => {
    db
        .collection('orders')
        .where('userHandle', '==', req.user.handle)
        .get()
        .then(data => {
            let screams = [];
            data.forEach((doc) => {
                screams.push(doc.data());
            });
            return res.json(screams);
        })
        .catch(err => console.error(err));
};

exports.postOneOrder = (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({error: "Niedozwolona metoda"});
    }
    if (req.body.body.trim() === '') {
        return res.status(400).json({error: 'Body nie może być puste'});
    }
    const newOrder = {
        body: req.body.body,
        title: req.body.title,
        deadline: req.body.deadline,
        userHandle: req.user.handle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };
    db.collection('orders')
        .add(newOrder)
        .then((doc) => {
            res.json({message: 'stworzono pomyslnie'})
        })
        .catch((err) => {
            res.status(500).json({error: 'blad'});
            console.error(err);
        });
};
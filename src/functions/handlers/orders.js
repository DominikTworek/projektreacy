const {db, admin} = require('../util/admin');

const {validateOrderData} = require('../util/validators');

exports.getAllOrders = (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).json({error: "Niedozwolona metoda"});
    }
    db
        .collection('orders')
        .get()
        .then(data => {
            let orders = [];
            data.forEach((doc) => {
                orders.push(doc.data());
            });
            return res.json(orders);
        })
        .catch(err => console.error(err));
};

exports.getAdminOrders = (req, res) => {
    db
        .collection('orders')
        .where('userHandle', '==', req.user.handle)
        .get()
        .then(data => {
            let orders = [];
            data.forEach((doc) => {
                orders.push(doc.data());
            });
            return res.json(orders);
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });


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
        complexity: req.body.complexity,
        userHandle: req.user.handle,
        workerCount: 0,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    const {valid, errors} = validateOrderData(newOrder);
    if (!valid) return res.status(400).json(errors);

    db.collection('orders')
        .add(newOrder)
        .then((doc) => {
            const resOrder = newOrder;
            resOrder.orderId = doc.id;
            res.json(resOrder);
        })
        .catch((err) => {
            res.status(500).json({error: 'blad'});
            console.error(err);
        });
};

exports.getOrder = (req, res) => {
    let orderData = {};
    db.doc(`/orders/${req.params.orderId}`).get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({error: 'Nie znaleziono zlecenia'});
            }
            orderData = doc.data();
            orderData.orderId = doc.id;
            return db
                .collection('workers')
                .where('orderId', '==', req.params.orderId)
                .get();
        })
        .then(data => {
            orderData.workers = [];
            data.forEach(doc => {
                orderData.workers.push((doc.data()));
            });
            return res.json(orderData);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        })
};

exports.workerOnOrder = (req,res) => {
    if(req.body.body.trim() === '') return res.status(400).json({error: 'Przesyłany pracownik jest pusty'});

    const newWorkerToOrder = {
        body: req.body.body,
        orderId: req.params.orderId,
        userHandle: req.body.handle,
        userImage: req.body.imageUrl
    };
    db.doc(`/orders/$req.params.orderId`).get()
        .then(doc => {
            if(!doc.exists){
                return res.status(404).json({error: 'Zlecenie nie istnieje'});
            }
            return doc.ref.update({workerCount: doc.data().workerCount +1});
        })
        .then(() => {
            return db.collection('workers').add(newWorkerToOrder);
        })
        .then(() => {
            res.json(newWorkerToOrder);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err.code});
        })
};

exports.deleteOrder = (req,res) => {
    const dokument = db.doc(`/orders/${req.params.orderId}`);
    document.get()
        .then(doc => {
            if(!doc.exists) {
                return res.status(404).json({error: 'Nie znaleziono zlecenia'});
            }
            if(doc.data().userHandle !== req.user.handle){
                return res.status(403).json({error: 'Nieautoryzowany'});
            } else {
                return document.delete();
            }
        })
        .then(() => {
            res.status(({order: 'Poprawnie usunięto zlecenie'}));
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err.code});
        })
};
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const { response } = require('express');
const port = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.qvg4g.mongodb.net/${ process.env.DB_NAME }?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db(`${ process.env.DB_NAME }`).collection("dishes");
    // const order = client.db(`${ process.env.DB_NAME }`).collection("orders");

    app.post('/addProduct', (req, res) => {
        collection.insertOne(req.body)
            .then(req => {
                res.send("Success!!")
            })
    })

    app.get('/products', (req, res) => {
        const dishCategory = req.query.category;
        collection.find({
            category: dishCategory
        })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.get('/productsForManage', (req, res) => {
        collection.find({})
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

    app.delete('/delete', (req, res) => {
        collection.deleteOne({
            _id: ObjectID(req.query.id)
        })
            .then(response => {

            })
    })

    app.get('/product', (req, res) => {
        const dishId = req.query.id;
        collection.find({
            _id: ObjectID(dishId)
        })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })

});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`)
})
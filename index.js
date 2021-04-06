const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 5000;

const app = express()
app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${ process.env.DB_USER }:${ process.env.DB_PASS }@cluster0.qvg4g.mongodb.net/${ process.env.DB_NAME }?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db(`${process.env.DB_NAME}`).collection("dishes");
    console.log(err);

});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${ port }`)
})
const express = require('express');

const mongodb = require('mongodb').MongoClient;

const app = express();
const port = 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017/shelterDB`;

let db;

mongodb.connect(
    connectionStringURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
        db = client.db();
        app.listen(port, () => {
            console.log(`App listening at http://localhost:${port}`);
        })
    }
)


app.use(express.json());

/* This is where the mongodb routes will go */






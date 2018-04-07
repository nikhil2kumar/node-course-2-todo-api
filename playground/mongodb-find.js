// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb serve');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5ac8685fee81761b3ce98e44')
    // }).toArray().then((docs) => {
    //     console.log('docs');
    //     console.log(docs);
    // }, err => {
    //     console.log('unable to fetch data from Todo');
    // });
    
    db.collection('Todos').find().count().then((count) => {
        console.log(`count: ${count}`);
    }, err => {
        console.log('unable to fetch data from Todo');
    });


    client.close();
});
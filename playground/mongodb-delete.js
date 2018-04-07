// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb serve');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //-------------------DeleteMany-----------------------
    // db.collection('Todos').deleteMany({
    //     text: 'Eat Lunch'
    // }).then((result) => {
    //     console.log(result);
    // }, err => {
    //     console.log('unable to delete datas from Todo');
    // });

    //-------------------deleteOne-----------------------
    // db.collection('Todos').deleteOne({
    //     text: 'Eat Lunch'
    // }).then((result) => {
    //     console.log(result);
    // }, err => {
    //     console.log('unable to delete data from Todo');
    // });

    //-------------------findOneAndDelete-----------------------
    db.collection('Todos').findOneAndDelete({
        completed: false
    }).then((result) => {
        console.log(result);
    }, err => {
        console.log('unable to delete data from Todo');
    });


    client.close();
});
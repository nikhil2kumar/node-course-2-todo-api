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

    //-------------------findOneAndUpdate-----------------------
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5ac89906b04b56b2809038e7')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // }, err => {
    //     console.log('unable to update data from Todo');
    // });


    //-----Increment operator
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ac86c1a1422862a30d67e36')
    }, {
        $inc: {
            age: 1
        }
    },{
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    }, err => {
        console.log('unable to update data from Todo');
    });


    client.close();
});
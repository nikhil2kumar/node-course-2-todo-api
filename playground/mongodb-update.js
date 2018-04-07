// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb serve');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

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
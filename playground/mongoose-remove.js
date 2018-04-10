// const MongoClient = require('mongodb').MongoClient;
const {ObjectID} = require('mongodb');

const { moongose } = require('./../server/db/moongose');
const { Todo } = require('./../server/models/todo');

// Todo.remove({}).then((todos) => {
//     console.log(todos);
// });

// Todo.findOneAndRemove().then( (result) => {
//     console.log(result);
// });

Todo.findByIdAndRemove('5ac9f7e2e1a04b73e2d7f29c').then( (result) => {
    console.log(result);
});
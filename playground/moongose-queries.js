const { ObjectID } = require('mongodb');

const { moongose } = require('./../server/db/moongose');
const { Todo } = require('./../server/models/todo');

var id = '5ac8dee89b32a715f4dba2e0';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

Todo.find({
    _id: id
}).then(todos => {
    console.log(todos);
});

Todo.findOne({
    _id: id
}).then(todo => {
    console.log(todo);
});

Todo.findById(id).then(todo => {
    if (!todo) return console.log('Id not found');
    console.log(todo);
}).catch(e => console.log(e));
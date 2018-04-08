var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/moongose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt
    });

    todo.save().then( (doc) => {
        res.send(doc);
    }, error => res.status(400).send(error));
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, error => res.status(400).send(error));
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

module.exports = {app};


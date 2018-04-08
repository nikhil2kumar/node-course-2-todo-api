var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var {mongoose} = require('./db/moongose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send();
    } else{
        Todo.findById(req.params.id).then((todos) => {
            if(todos)  res.send({todos});
            else res.status(404).send();
        }, error => res.status(400).send(error));
    }
});

app.delete('/todos/:id', (req, res) => {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send();
    } else{
        Todo.findByIdAndRemove(req.params.id).then((todos) => {
            if(todos) return res.send({todos});
            else res.status(404).send();
        }, error => res.status(400).send(error));
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = {app};


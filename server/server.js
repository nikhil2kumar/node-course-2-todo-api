require('./config/config');

const _ = require('lodash');

var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/moongose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        completedAt: req.body.completedAt,
        _createdBy: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, error => res.status(400).send(error));
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _createdBy: req.user._id
    }).then((todos) => {
        res.send({ todos });
    }, error => res.status(400).send(error));
});

app.get('/todos/:id', authenticate, (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send();
    } else {
        Todo.findOne({
            _createdBy: req.user._id,
            _id: req.params.id
        }).then((todos) => {
            if (todos) res.send({ todos });
            else res.status(404).send();
        }, error => res.status(400).send(error));
    }
});

app.delete('/todos/:id', authenticate, (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send();
    } else {
        Todo.findOneAndRemove({
            _createdBy: req.user._id,
            _id: req.params.id
        }).then((todos) => {
            if (todos) return res.send({ todos });
            else res.status(404).send();
        }, error => res.status(400).send(error));
    }
});

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({
        _createdBy: req.user._id,
        _id: req.params.id
    }, { $set: body }, { new: true }).then((todos) => {
        if (todos) return res.send({ todos });
        else res.status(404).send();
    }, error => res.status(400).send(error));
});


app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);
    user.save().then(() => {
        // res.send(doc);
        return user.generateAuthToken();
    }).
        then(token => {
            res.header('x-auth', token).send(user);
        })
        .catch(err => res.status(400).send(err));
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//User Login POST /users/login
app.post('/users/login/', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then(user => {
        return user.generateAuthToken().then(token => {
            res.header('x-auth', token).send(user);
        })
    }).catch(e => {
        res.status(400).send();
    });
});

//logout
app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = { app };


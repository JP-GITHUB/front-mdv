var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/perfiles', function(req, res) {
    res.render('perfiles');
});

app.use('/permisos', function(req, res) {
    res.render('permisos');
});

app.use('/register', function(req, res) {
    res.render('registro');
});

app.use('/forgot_password', function(req, res) {
    res.render('forgot_password');
});

app.use('/change_password', function(req, res) {
    res.render('change_password');
});

app.use('/usuarios', function(req, res) {
    res.render('usuarios');
});

module.exports = app;
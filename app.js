var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
const { connectToDb } = require('./db/db.js');
// const logMiddleware = require('./middlewares/logMiddleware');
const session = require('express-session');
require("dotenv").config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRouter.js');
const osRouter = require('./routes/osRouter')
const carRouter = require('./routes/carRouter.js')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(logMiddleware);

app.use(session({
  secret : 'net militaire secret',
  resave : false,
  saveUninitialized : true,
  cookie: {
    secure: false,
    maxAge: 24 *60 *60 *1000
  }
}))


app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);
app.use('/cars', carRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app)
server.listen(5000, () => { 
  connectToDb();
console.log('app is running on port 5000')
})



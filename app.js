var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, 
  { useNewUrlParser: true, 
  useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});

var Vehicles = require("./models/vehicles");

async function recreateDB() {
  // Delete everything
  await Vehicles.deleteMany();
  let instance1 = new Vehicles({
    name: "AUDI", color: "Blue",
    price: 430000
  });

  let instance2 = new Vehicles({
    name: "BMW", color: "Green",
    price: 63000
  });

  let instance3 = new Vehicles({
    name: "BENZ", color: "White",
    price: 67000
  });

  const newArray = [instance1.save(), instance2.save(), instance3.save()];
  Promise.all(newArray).then(doc => {
    console.log("First object saved")
    console.log("Second object saved")
    console.log("Third object saved")
  }
  ).catch(err => {
    console.error(err)
  });
}
let reseed = true;
if (reseed) { recreateDB(); }


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vehiclesRouter = require('./routes/vehicles');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/vehicles', vehiclesRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);

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

module.exports = app;

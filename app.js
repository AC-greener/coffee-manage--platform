var createError = require('http-errors')
    ,express = require('express')
    ,path = require('path')
    ,cookieParser = require('cookie-parser')
    ,logger = require('morgan')
    ,orderRouter = require('./routes/order')
    ,orderInfoRouter = require('./routes/orderInfo')
    ,manageUserRouter = require('./routes/manageUser')
    ,manageGoodsRouter = require('./routes/manageGoods')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', orderRouter);
app.use('/orderInfo', orderInfoRouter);
app.use('/manageGoods', manageGoodsRouter);
app.use('/manageUser', manageUserRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/coffeemanage');

db.on('error', console.error.bind(console, '数据库连接失败'));

db.once('open', function (callback) {
  console.log("数据库成功连接");
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

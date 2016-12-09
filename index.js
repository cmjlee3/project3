//install dependencies
// require('dotenv').config();
const express               = require('express');
const logger                = require('morgan');
const path                  = require('path');
const bodyParser            = require('body-parser');
const methodOverride        = require('method-override');
const session               = require('express-session');
const cookieParser          = require('cookie-parser');
const SECRET                = 'tacos3000';


// connection to model                   = require('./models/model');
const {}          = require('./models/model')
// const Uber                  = require('node-uber');
// const uberMethod            = require('../models/uber')

//initializing express server
const app                   = express();
const port                  = process.env[2] || process.env.PORT || 3000;

//setting view engine to ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//for css
app.use(methodOverride('_method'));

//for css
app.use(bodyParser.urlencoded({ extended: true }));

//for css
app.use(bodyParser.json());

//reads cookie from brower
app.use(cookieParser());

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SECRET
}));

app.use(logger('dev'));

//link to routes
const homeRouter=require('./routes/home');
const authRouter = require('./routes/auth');
const userRouter= require('./routes/users');
const mapRouter = require('./routes/map');
const bucketListRouter = require('./routes/bucket_list');

//call to routes
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/map', mapRouter);
app.use('/bucketlist', bucketListRouter);

app.listen(port, ()=> console.log('Server is listening on port ', port));


app.use(express.static(path.join(__dirname, 'public')));

// app.get('/api/login', function(request, response) {
//   var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
//   response.redirect(url);
// });

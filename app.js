var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOHQ_URL, function (err, res) {
  if (err) { console.log ('ERROR connecting to MongoDB: ' + err); }
});

var passport = require('passport');
var flash = require('express-flash');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

var hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: {
  }
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

function exposeTemplates(req, res, next) {
  // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
  // templates which will be shared with the client-side of the app.
  hbs.getTemplates('shared/templates/', {
    cache      : app.enabled('view cache'),
    precompiled: true
  }).then(function (templates) {
    // RegExp to remove the ".handlebars" extension from the template names.
    var extRegex = new RegExp(hbs.extname + '$');

    // Creates an array of templates which are exposed via
    // `res.locals.templates`.
    templates = Object.keys(templates).map(function (name) {
      return {
        name    : name.replace(extRegex, ''),
        template: templates[name]
      };
    });

    // Exposes the templates during view rendering.
    if (templates.length) {
      res.locals.templates = templates;
    }

    setImmediate(next);
  })
  .catch(next);
}

app.locals.inspect = require('util').inspect;
// require('./config/passport')(passport);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('noClue'));
app.use(session({ secret: 'noClue', resave: true, saveUninitialized: true, cookie: { exipres: false }}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', exposeTemplates, function(req, res) {
  res.render('index', { title: 'ECOM' });
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

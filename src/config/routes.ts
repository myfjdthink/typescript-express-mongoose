import UserController from '../app/controllers/UserController';
import OrderController from '../app/controllers/OrderController'
'use strict';

/*
 * Module dependencies.
 */

// Note: We can require users, articles and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

const user = new UserController()


/**
 * Route middlewaresß
 */

// TODO middlewares

/**
 * Expose routes
 */
export default function (app) {
  // user routes

  app.get('/user/aotoRoute', user.aotoRoute);
  //user.register
  /**
   * Error handling
   */

    // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    //err.status = 404;
    next(err);
  });

// error handlers

// development error handler
// will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

// production error handler
// no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};

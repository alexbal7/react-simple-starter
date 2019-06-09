let ENV;

if (process.env.NODE_ENV === 'development') {
  ENV = require('./environment.dev');
} else if (process.env.NODE_ENV === 'production') {
  ENV = require('./environment.prod');
}

module.exports = ENV;

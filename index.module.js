if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/es/calvin.production.min.js');
} else {
  module.exports = require('./dist/es/calvin.development.js');
}

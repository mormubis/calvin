if (process.env.NODE_ENV === 'production') {
  module.exports = require('./es/calvin.production.min.js');
} else {
  module.exports = require('./es/calvin.development.js');
}

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/cjs/calvin.production.min.js');
} else {
  module.exports = require('./dist/cjs/calvin.development.js');
}

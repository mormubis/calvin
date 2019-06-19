if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/cjs/calvin.production.js');
} else {
  module.exports = require('./dist/cjs/calvin.development.js');
}

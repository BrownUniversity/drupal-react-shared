
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./drupal-react-shared.cjs.production.min.js')
} else {
  module.exports = require('./drupal-react-shared.cjs.development.js')
}

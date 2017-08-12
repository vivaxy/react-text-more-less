/**
 * @since 2017-04-11 19:08:16
 * @author vivaxy
 */

if (!global._babelPolyfill) {
    require('babel-polyfill');
}
require('babel-register');
module.exports = require('./gt/index');

/**
 * @since 2017-01-31 17:19
 * @author vivaxy
 */

const ip = require('ip');

exports.DEVELOPMENT_IP = ip.address();
exports.DEVELOPMENT_PORT = Math.floor(Math.random() * 65536);
exports.DIST_PATH = `dist`;

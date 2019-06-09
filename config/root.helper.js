'use strict';

const path = require('path');
const projectRoot = path.resolve(__dirname, '..');

/** Helper function to get absolute path for files/folders 
 *  Example:
 *  root('src', 'app') -> /home/user/Work/react-simple-starter/src/app
*/
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [projectRoot].concat(args));
}

exports.root = root;

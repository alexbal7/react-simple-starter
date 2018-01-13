'use strict';

const path = require('path');
const projectRoot = path.resolve(__dirname, '../..');

/** Helper function to get absolute path for files/folders 
 *  Example:
 *  root('src', 'app') -> /home/user/Work/varianti-frontend/src/app
*/
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  let absPath = path.join.apply(path, [projectRoot].concat(args));
  return absPath;
}

exports.root = root;
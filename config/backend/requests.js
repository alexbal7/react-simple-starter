const BASIC_REQUEST_PREFIX = '/rest/';

const REQUESTS = {
  /**
   * Requests to backend (REST API).
   * Request parameters:
   * key <string> - identifier in frontend app
   * type <string> - GET, POST, PUT, DELETE
   * path <string> - url
   */
  TEST: {
    key: 'get.test',
    type: 'GET',
    path: BASIC_REQUEST_PREFIX + 'test'
  }
};

exports.REQUESTS = REQUESTS;

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = exports.rewrite = exports.detect = exports.access = exports.domains = undefined;

var _async = require('async');

var _loadImg = require('load-img');

var _loadImg2 = _interopRequireDefault(_loadImg);

var _callbackTimeout = require('callback-timeout');

var _callbackTimeout2 = _interopRequireDefault(_callbackTimeout);

var _simpleMemoize = require('simple-memoize');

var _simpleMemoize2 = _interopRequireDefault(_simpleMemoize);

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domains = exports.domains = ['vztube.vzwcorp.com', 'vztube.verizonwireless.com', 'vztube.verizon.com'];

// Determines if the user has access to the defined domain.
var access = exports.access = (0, _simpleMemoize2.default)(function (domain, callback) {
  (0, _loadImg2.default)('https://' + domain + '/images/spacer.gif', (0, _callbackTimeout2.default)(function (err, el) {
    callback(null, !err);
  }, 1000));
});

// Returns the first domain a user has access to.
var detect = exports.detect = (0, _simpleMemoize2.default)(function (callback) {
  (0, _async.detectSeries)(domains, access, function (err, domain) {
    callback(err, domain);
  });
});

// Rewrites the provided URL using the domain from `detect`.
var rewrite = exports.rewrite = (0, _simpleMemoize2.default)(function (url, callback) {
  detect(function (err, domain) {
    callback(err, url.replace(/vztube.(vzwcorp|verizonwireless|verizon).com/, domain));
  });
});

// Returns the JSON response from VZTube's API.
var api = exports.api = (0, _simpleMemoize2.default)(function (id, callback) {
  rewrite('https://vztube.verizon.com/getVideoID.php?id=' + id + '&type=emp_vzlearn', function (err, domain) {
    (0, _jsonp2.default)(domain, function (err, data) {
      callback(err, (0, _objectAssign2.default)(data, { source: data.poster.replace('/thumbs', '').replace(/.jpg/, '.mp4') }));
    });
  });
});

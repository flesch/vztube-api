'use strict';

import { detectSeries } from 'async';
import img from 'load-img';
import timeout from 'callback-timeout';
import memoize from 'simple-memoize';
import jsonp from 'jsonp';
import assign from 'object-assign';

export const domains = ['vztube.vzwcorp.com', 'vztube.verizonwireless.com', 'vztube.verizon.com'];

// Determines if the user has access to the defined domain.
export const access = memoize((domain, callback) => {
  img(`https://${domain}/images/spacer.gif`, timeout((err, el) => {
    callback(null, !err);
  }, 1000));
});

// Returns the first domain a user has access to.
export const detect = memoize((callback) => {
  detectSeries(domains, access, (err, domain) => {
    callback(err, domain);
  });
});

// Rewrites the provided URL using the domain from `detect`.
export const rewrite = memoize((url, callback) => {
  detect((err, domain) => {
    callback(err, url.replace(/vztube.(vzwcorp|verizonwireless|verizon).com/, domain));
  });
});

// Returns the JSON response from VZTube's API.
export const api = memoize((id, callback) => {
  rewrite(`https://vztube.verizon.com/getVideoID.php?id=${id}&type=emp_vzlearn`, (err, domain) => {
    jsonp(domain, (err, data) => {
      callback(err, assign(data, { source:data.poster.replace('/thumbs', '').replace(/.jpg/, '.mp4') }));
    });
  });
});

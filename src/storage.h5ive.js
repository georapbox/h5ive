/*! storage.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */
module.exports = (function () {
    'use strict';

    // Require dependancies
    var u = require('utils/index'),
        is = u.is;

    return function storage(opts) {
        var store,
            publicAPI,
            expires;

        opts = opts || {};

        if ('expires' in opts && is.number(opts.expires) && opts.expires > 0) {
            expires = opts.expires + (new Date()).getTime();
        }

        // Determine whether save to sessionStorage or localStorage
        store = opts.expires === 'session' ? sessionStorage : localStorage;

        function save(data) {
            var key,
                val;

            // Do nothing if data is not object
            if (is.not.plainObject(data)) {
                return publicAPI;
            }

            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    val = {'h5ive:data': data[key]};

                    if (expires) {
                        val['h5ive:expires'] = expires;
                    }

                    try {
                        store.setItem(key, JSON.stringify(val));
                    } catch (err) {}
                }
            }

            return publicAPI;
        }

        function discard(keys) {
            if (is.not.array(keys)) {
                keys = [keys];
            }

            for (var i = 0; i < keys.length; i++) {
                store.removeItem(keys[i]);
            }

            return publicAPI;
        }

        function get(keys) {
            var i,
                val,
                ret = {},
                now = (new Date()).getTime();

            if (is.not.array(keys)) {
                keys = [keys];
            }

            for (i = 0; i < keys.length; i++) {
                val = ret[keys[i]] = store.getItem(keys[i]);

                try {
                    val = JSON.parse(val);
                    if ('h5ive:data' in val) {
                        if ('h5ive:expires' in val && now >= val['h5ive:expires']) {
                            delete ret[keys[i]];
                            store.removeItem(keys[i]);
                            continue;
                        }
                        ret[keys[i]] = val['h5ive:data'];
                    }
                } catch (err) {}
            }

            if (keys.length < 2) {
                if (keys.length > 0 && (keys[0] in ret)) {
                    return ret[keys[0]];
                } else {
                    return undefined;
                }
            }

            return ret;
        }

        publicAPI = {
            save: save,
            discard: discard,
            get: get
        };

        return publicAPI;
    };
}());

/*! video.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */
module.exports = (function () {
    'use strict';

    return function video(opts) {
        var publicAPI, VIDEO;

        VIDEO = document.createElement('video');

        function element() {
            return VIDEO;
        }

        publicAPI = {
            element: element
        };

        return publicAPI;
    };
}());

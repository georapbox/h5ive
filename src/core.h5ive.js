/*! core.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */
(function (global) {
    'use strict';

    global.h5 = {
        storage: require('storage.h5ive'),
        animationFrame: require('animationFrame.h5ive'),
        canvas: require('canvas.h5ive'),
        video: require('video.h5ive'),
        userMedia: require('usermedia.h5ive'),
        xhr: require('xhr.h5ive')
    };
}(window));

/*! animationFrame.h5ive.js | (c) Kyle Simpson | MIT License: http://getify.mit-license.org */
module.exports = (function () {
    'use strict';

    var rAF = (window.requestAnimationFrame || window.msRequestAnimationFrame ||
		    window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
		    window.oRequestAnimationFrame),
		cAF = (window.cancelAnimationFrame ||
            window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame ||
            window.mozCancelAnimationFrame || window.mozCancelRequestAnimationFrame ||
            window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame ||
            window.oCancelAnimationFrame || window.oCancelRequestAnimationFrame),
        publicAPI, q_ids = {};

    function qID() {
        var id;
        do {
            id = Math.floor(Math.random() * 1E9);
        } while (id in q_ids);
        return id;
    }

    function queue(cb) {
        var qid = qID();

        q_ids[qid] = rAF(function () {
            delete q_ids[qid];
            cb.apply(publicAPI,arguments);
        });

        return qid;
    }

    function queueAfter(cb) {
        var qid;

        qid = queue(function () {
            // do our own rAF call here because we want to re-use the same `qid` for both frames
            q_ids[qid] = rAF(function () {
                delete q_ids[qid];
                cb.apply(publicAPI,arguments);
            });
        });

        return qid;
    }

    function cancel(qID) {
        if (qID in q_ids) {
            cAF(q_ids[qID]);
            delete q_ids[qID];
        }
        return publicAPI;
    }

    function unsupported() {
        throw new Error('"requestAnimationFrame" not supported.');
    }

    if (rAF && cAF) {
        publicAPI = {
            queue: queue,
            queueAfter: queueAfter,
            cancel: cancel
        };
    } else {
        publicAPI = {
            queue: unsupported,
            queueAfter: unsupported,
            cancel: unsupported
        };
    }

    return publicAPI;
}());

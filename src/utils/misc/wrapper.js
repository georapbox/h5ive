/**
 * @module utils/misc/wrapper
 */
module.exports = (function () {
    'use strict';

    var Wrapper = function (value) {
        this[0] = value;
    };

    var myWrapper = function (x) {
        return new Wrapper(x);
    };

    Wrapper.prototype.map = function (fn) {
        return myWrapper(fn.call(this, this[0]));
    };

    return myWrapper;
}());

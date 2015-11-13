/**
 * @module utils/misc/throttle
 */
module.exports = (function () {
    'use strict';

    /**
     * Limits the number of times a function can be called in a given period.
     * @param {function} callback The function to be executed.
     * @param {number} n Time of delay in milliseconds.
     */
    function throttle(callback, n) {
        var wait = false;                 // Initially, we're not waiting
        return function () {              // We return a throttled function
            if (!wait) {                  // If we're not waiting
                callback.call();          // Execute users function
                wait = true;              // Prevent future invocations
                setTimeout(function () {  // After a period of time
                    wait = false;         // And allow future invocations
                }, n);
            }
        };
    }

    return throttle;
}());

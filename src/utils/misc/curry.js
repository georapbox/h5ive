/**
 * @module utils/misc/curry
 */
module.exports = (function () {
    'use strict';

    /**
     * Returns a curried equivalent of the provided function.
     * @param fn {function} The function to curry.
     * @return {function} A new, curried function.
     */
    function curry(fn) {
        var initialArguments = [].slice.call(arguments, 1),
            argumentsLength = fn.length;

        function curried(args) {
            if (args.length >= argumentsLength) {
                return fn.apply(null, args);
            }

            return function () {
                return curried(args.concat([].slice.call(arguments)));
            };
        }

        return curried(initialArguments);
    }

    return curry;
}());

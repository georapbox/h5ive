/**
 * @module utils/misc/is
 */
module.exports = (function () {
    'use strict';

    var is; // Holds the API methods.

    // Define some constants.
    var ARRAY = '[object Array]',
        STRING = '[object String]',
        FUNCTION = '[object Function]',
        NUMBER = '[object Number]';

    var toString = Object.prototype.toString,             // jshint ignore: line
        arraySlice = Array.prototype.slice,               // jshint ignore: line
        hasOwnProperty = Object.prototype.hasOwnProperty; // jshint ignore: line

    var type = {}.toString;

    /**
     * Checks if 'value' is a function.
     * @param {*} value The value to check.
     * @return {boolean} Returns true if 'value' is a function, else returns false.
     */
    function isFunction(value) {
        return typeof value === 'function' && type.call(value) === FUNCTION;
    }

    /**
     * Checks if 'value' is array
     * @param {*} value The 'value' to check if is array
     * @return {boolean} Returns true if array, else false
     */
    function isArray(value) {
        return value &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            type.call(value) === ARRAY ||
            false;
    }

    /**
     * Checks if 'value' is string.
     * @param {*} 'value' to check if is string.
     * @return {boolean} Returns true if string, else false.
     */
    function isString(value) {
        return typeof value === 'string' && type.call(value) === STRING;
    }

    /**
     * Checks if 'value' is the language type of "Object".
     * @param {*} value The value to check.
     * @return {boolean} Returns true if "value" is an object, else false.
     */
    function isObject(value) {
        var type = typeof value;
        return !!value && (type === 'function' || type === 'object' || false);
    }

    /**
     * Checks if "value" is an object created by the "Object" constructor.
     * @param {*} value the value to check.
     * @return {boolean} Returns true if "value" is an object created by the "Object" constructor, else false.
     */
    function isPlainObject(value) {
        return !!value && typeof value === 'object' && value.constructor === Object;
    }

    /**
     * Checks if 'value' is a number.
     * Note: NaN is considered a number.
     * @param {*} value The value to check.
     * @return {boolean} Returns true if 'value' is a number, else false.
     */
    function isNumber(value) {
        return value &&
            type.call(value) === NUMBER &&
            typeof value === 'number' ||
            false;
    }

    /**
     * Checks if 'value' is a boolean value.
     * @param {*} value The value to check.
     * @return {boolean} Returns true if the 'value' is a boolean value, else false.
     */
    function isBoolean(value) {
        return (value === true || value === false || value && typeof obj === 'object') &&
            (Object.prototype.toString.call(value) === '[object Boolean]') ||
            false;
    }

    /**
     * Checks if 'value' is null or undefined.
     * @param {*} value The value to check.
     * @return {boolean} Returns true if 'value' is null or undefined, else false.
     */
    function isNullOrUndefined(value) {
        // NOTE: Using non-strict equality check here because we're checking if value is null OR undefined.
        return value == null; // jshint ignore: line
    }

    /**
     * Helper function which reverses the sense of predicate result.
     * @param {function} func
     * @return {function}
     */
    function not(func) {
        return function () {
            return !func.apply(null, arraySlice.call(arguments));
        };
    }

    /**
     * Helper function which call predicate function per parameter and return true if all pass.
     * @param {function} func
     * @return {function}
     */
    function all(func) {
        return function () {
            var parameters = arraySlice.call(arguments),
                length = parameters.length;

            if (length === 1 && isArray(parameters[0])) {
                parameters = parameters[0];
                length = parameters.length;
            }

            for (var i = 0; i < length; i++) {
                if (!func.call(null, parameters[i])) {
                    return false;
                }
            }

            return true;
        };
    }

    /**
     * Helper function which call predicate function per parameter and return true if any pass.
     * @param {function} func
     * @return {function}
     */
    function any(func) {
        return function () {
            var parameters = arraySlice.call(arguments),
                length = parameters.length;

            if (length === 1 && isArray(parameters[0])) {
                parameters = parameters[0];
                length = parameters.length;
            }

            for (var i = 0; i < length; i++) {
                if (func.call(null, parameters[i])) {
                    return true;
                }
            }

            return false;
        };
    }

    // API
    /* -------------------------------------------------------------------------- */
    is = {
        'not': not,
        'all': all,
        'any': any,
        'function': isFunction,
        'array': isArray,
        'string': isString,
        'object': isObject,
        'plainObject': isPlainObject,
        'number': isNumber,
        'boolean': isBoolean,
        'nullOrUndefined': isNullOrUndefined
    };

    // Set 'not', 'all' and 'any' interfaces to methods based on their api property.
    (function () {
        var makeInterface = function (interfaces, option) {
            interfaces.forEach(function (item) {
                switch (item) {
                    case 'not':
                        is.not[option] = is.not(is[option]);
                        break;
                    case 'all':
                        is.all[option] = is.all(is[option]);
                        break;
                    case 'any':
                        is.any[option] = is.any(is[option]);
                        break;

                }
            });
        };

        Object.keys(is).forEach(function (option) {
            if (is.function(is[option])) {
                makeInterface(['not', 'all', 'any'], option);
            }
        });
    }());

    return is;
}());

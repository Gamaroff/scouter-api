function Tools() {
    'use strict';

    var self = this;

    self.formatString = function (str, args) {
        var regex = new RegExp("{-?[0-9]+}", "g");

        var result = str.replace(regex, function (item) {
            var intVal = parseInt(item.substring(1, item.length - 1));
            var replace;
            if (intVal >= 0) {
                //replace = isNaN(args[intVal]) ? '\'' + args[intVal] + '\'' : args[intVal];
                replace = args[intVal];
            } else if (intVal === -1) {
                replace = "{";
            } else if (intVal === -2) {
                replace = "}";
            } else {
                replace = "";
            }
            return replace;
        });

        return result;

    };

    self.replaceAll = function (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }

}

module.exports = new Tools();
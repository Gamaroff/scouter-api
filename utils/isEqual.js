module.exports = function (obj1, obj2) {

    var result = true;

    for (var prop in obj1) {
        if (obj2[prop] !== obj1[prop]) {
            result = false;
        }
    }

    return result;
};
exports.isEqual = function(a, b) {
    ///<summary>Checks if two objects are equals</summary>

        return JSON.stringify(a) === JSON.stringify(b);
    };
const visibilityValueConverter = {
    toView: function (value) {
        if (value) {
            return "collapsed";
        }
        else {
            return "visible";
        }
    },
    toModel: function (value) {
        return value;
    }
};

module.exports = visibilityValueConverter;

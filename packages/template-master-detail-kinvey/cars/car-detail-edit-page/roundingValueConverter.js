const roundingValueConverter = {
    toView: function (value) {
        return value;
    },
    toModel: function (value) {
        return Math.round(value);
    }
};

module.exports = roundingValueConverter;

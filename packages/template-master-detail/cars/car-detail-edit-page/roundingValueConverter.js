function RoundingValueConverter() {}

RoundingValueConverter.prototype.toView = function (value) {
    return value;
};

RoundingValueConverter.prototype.toModel = function (value) {
    return Math.round(value);
};

module.exports = RoundingValueConverter;

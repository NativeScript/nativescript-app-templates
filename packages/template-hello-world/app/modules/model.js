var model = {
    counter: 42,
    getText: function() {
        return this.counter + " taps left";
    },
    action: function() {
        this.counter--;
    }
}

module.exports = model;
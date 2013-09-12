requirejs(['jquery'], function($) {
    beforeEach(function () {
        this.addMatchers({
            toHaveClass: function(className) {
                var notText = this.isNot ? " not" : "";
                this.message = function () {
                    return "Expected " + $('<div />').append(this.actual.clone()).html() + notText + " to have class '" + className + "'";
                };

                return this.actual.hasClass(className);
            }
        });
    });
});

define(['marionette', 'underscore', 'text!../template/waiting.html'], function (Marionette, _, html) {
    "use strict";
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'btn btn-primary'
    });
});

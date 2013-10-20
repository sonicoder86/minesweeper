define(['marionette', 'underscore', 'text!../template/gametype.html'], function (Marionette, _, html) {
    return Marionette.ItemView.extend({
        template: _.template(html),
        tagName: 'li',

        triggers: {
            'click a': 'new_game'
        }
    })
});
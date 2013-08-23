define(['marionette', 'underscore', 'text!../template/field.html'], function (Marionette, _, html) {
    return Marionette.ItemView.extend({
        template: _.template(html),
        className: 'pull-left',

        serializeData: function(){
            return {
                text: this.model.get('x')+''+this.model.get('y')
            }
        }
    })
});
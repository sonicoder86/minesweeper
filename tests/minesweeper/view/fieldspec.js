define(['minesweeper/model/field', 'minesweeper/view/field'], function(FieldModel, FieldView) {
    "use strict";
    describe('FieldView', function() {
        var model, view, triggered;

        beforeEach(function() {
            model = new FieldModel({});
            view = new FieldView({model: model});
            triggered = false;
        });

        it('should trigger display event when clicked with left mouse button', function() {
            var event = {};
            event.which = 1;

            view.on('display', function() { triggered = true; });

            view.triggerDownClick(event);

            expect(triggered).toBeTruthy();
        });

        it('should trigger flag event when clicked with right mouse button', function() {
            var event = {};
            event.which = 3;

            view.on('flag', function() { triggered = true; });

            view.triggerDownClick(event);

            expect(triggered).toBeTruthy();
        });

        xit('should display as pressed when model is displayed', function() {
            model.set('isDisplayed', true);
            view.render();

            expect(view.$el.find('.btn')).toHaveClass('active');
        });

        xit('should render again when model changes', function() {
            model.set('isDisplayed', true);
            view.render();

            model.set('isDisplayed', false);

            expect(view.$el.find('.btn')).not.toHaveClass('active');
        });
    });
});
define(['minesweeper/model/field', 'minesweeper/view/field'], function(FieldModel, FieldView) {
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
        })
    })
});
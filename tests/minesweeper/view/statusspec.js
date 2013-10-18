define(['minesweeper/model/maze', 'minesweeper/view/status'], function(MazeModel, StatusView) {
    describe('StatusView', function() {
        var model, view, triggered;

        beforeEach(function() {
            model = new MazeModel({});
            model.generate();

            view = new StatusView({model: model});
            triggered = false;
        });

        afterEach(function() {
            view.stopListening();
        });

        it('should display current status', function() {
            view.render();

            expect(view.ui.statusContainer.text()).toEqual('in_progress');
        });

        it('should display new status when status change', function() {
            view.render();
            model.set('status', 'defeat');

            expect(view.ui.statusContainer.text()).toEqual('defeat');
        });
    })
});
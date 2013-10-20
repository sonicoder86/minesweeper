define(['minesweeper/model/maze', 'minesweeper/view/status'], function(MazeModel, StatusView) {
    describe('StatusView', function() {
        var maze, view, triggered;

        beforeEach(function() {
            maze = new MazeModel({size: 2, bombs: 1});
            maze.generate();

            view = new StatusView({model: maze});
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
            maze.set('status', 'defeat');

            expect(view.ui.statusContainer.text()).toEqual('defeat');
        });

        it('should display flags left', function() {
            view.render();

            expect(view.ui.flagsContainer.text()).toEqual('1');
        });

        it('should display percent completed', function() {
            view.render();

            expect(view.ui.percentContainer.text()).toEqual('0 %');
        });

        it('should display new percent when field displayed', function() {
            view.render();
            maze.getField(0, 0).flag();

            expect(view.ui.percentContainer.text()).toEqual('25 %');
        });
    })
});
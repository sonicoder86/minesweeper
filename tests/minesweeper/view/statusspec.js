define(
    ['minesweeper/model/maze', 'minesweeper/model/game', 'minesweeper/model/gametype', 'minesweeper/view/status'],
    function(MazeModel, GameModel, GameTypeModel, StatusView)
{
    "use strict";
    describe('StatusView', function() {
        var maze, view, triggered, game;

        beforeEach(function() {
            game = new GameModel();
            game.generate(new GameTypeModel({bombs: 1}));
            maze = game.maze;

            view = new StatusView({model: game});
            triggered = false;
        });

        afterEach(function() {
            view.stopListening();
        });

        it('should display current status', function() {
            view.render();

            expect(view.ui.statusContainer.text()).toEqual('In progress');
        });

        it('should display new status when status change', function() {
            view.render();
            view.onShow();
            game.set('status', 'defeat');

            expect(view.ui.statusContainer.text()).toEqual('Defeat');
        });

        it('should display percent completed', function() {
            view.render();

            expect(view.ui.percentContainer.text()).toEqual('0 %');
        });

        it('should display new percent when field displayed', function() {
            view.render();
            view.onShow();
            game.flag(maze.getField(0, 0));

            expect(view.ui.percentContainer.text()).toEqual('11 %');
        });
    });
});
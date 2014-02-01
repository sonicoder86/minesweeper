define(['minesweeper/model/gametype', 'minesweeper/view/gametype'], function(GameTypeModel, GameTypeView) {
    "use strict";
    describe('FieldView', function() {
        var model, view, triggered;

        beforeEach(function() {
            model = new GameTypeModel();
            view = new GameTypeView({model: model});
            triggered = false;
        });

        it('should display size and bombs of a game', function() {
            view.render();

            expect(view.$el.text()).toEqual('3 x 3 with 1 bombs');
        });
    });
});
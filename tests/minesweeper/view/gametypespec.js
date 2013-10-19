define(['minesweeper/model/gametype', 'minesweeper/view/gametype'], function(GameTypeModel, GameTypeView) {
    describe('FieldView', function() {
        var model, view, triggered;

        beforeEach(function() {
            model = new GameTypeModel({size: 5, bombs: 1});
            view = new GameTypeView({model: model});
            triggered = false;
        });

        it('should display size and bombs of a game', function() {
            view.render();

            expect(view.$el.text()).toEqual('5 x 5 with 1 bombs');
        });
    })
});
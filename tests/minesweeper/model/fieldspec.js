define(['minesweeper/model/field', 'underscore'], function(FieldModel, _) {
    var field;

    describe('Field model', function() {
        beforeEach(function() {
            field = new FieldModel({x: 1, y: 1});
        });

        it('should have 8 possible neighbours', function() {
            var possibleNeighbours = field.getPossibleNeighbours();

            expect(possibleNeighbours.length).toEqual(8);
        });

        it('possible neighbours should not contain the model itself', function() {
            var possibleNeighbours = field.getPossibleNeighbours();

            expect(possibleNeighbours).not.toContain({x: 1, y: 1});
        });

        it('should display current status when parameters given', function() {
            var variants = [
                ['B', {isBomb: true, isFlagged: false, isDisplayed: true}],
                ['5', {isBomb: false, isFlagged: false, isDisplayed: true, bombsNear: 5}],
                ['', {isBomb: false, isFlagged: false, isDisplayed: true, bombsNear: 0}],
                ['', {isBomb: true, isFlagged: false, isDisplayed: false}],
                ['F', {isBomb: false, isFlagged: true, isDisplayed: true}]
            ];

            _.forEach(variants, function(variant) {
                field.set(variant[1], {silent: true});

                expect(field.getDisplayStatus()).toEqual(variant[0]);
            }, this)
        });

        it('should mark as flagged when not displayed before', function() {
            field.set({isFlagged: false, isDisplayed: false});

            field.flag();

            expect(field.get('isFlagged')).toBeTruthy();
            expect(field.get('isDisplayed')).toBeTruthy();
        });

        it('should not flag when field was displayed before', function() {
            field.set({isFlagged: false, isDisplayed: true});

            field.flag();

            expect(field.get('isFlagged')).toBeFalsy();
            expect(field.get('isDisplayed')).toBeTruthy();
        });

        it('should remove flag when field was flagged before', function() {
            field.set({isFlagged: true, isDisplayed: true});

            field.flag();

            expect(field.get('isFlagged')).toBeFalsy();
            expect(field.get('isDisplayed')).toBeFalsy();
        });
    });
});
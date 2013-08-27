define(['minesweeper/model/field'], function(FieldModel) {
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
    });
});
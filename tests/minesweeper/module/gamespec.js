define(['minesweeper/application', 'minesweeper/module/game', 'minesweeper/collection/field'],
    function(application, GameModuleSetup, FieldCollection)
{
    var fields, status = 'in_progress';

    beforeEach(function() {
        fields = new FieldCollection();
        application.reqres.setHandler("maze:generateFields", function(size, bombs) {
            return fields;
        });
        application.reqres.setHandler("maze:status", function(size, bombs) {
            return status;
        });
    });

    afterEach(function() {
        application.reqres.removeHandler("maze:generateFields");
    });

    describe('GameModule', function() {
        it('should render requested fields', function() {
            spyOn(application.mainRegion, 'show');

            GameModuleSetup(application);

            expect(application.mainRegion.show).toHaveBeenCalled();

            var showCallParameters = application.mainRegion.show.mostRecentCall.args;
            expect(showCallParameters[0].collection).toEqual(fields);
        });
    });
});

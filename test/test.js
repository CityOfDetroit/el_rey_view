var routerLib = require('../app/js/router.class.js');
describe('Test Router', function () {
    var router = new routerLib.Router();
    console.log(typeof(router));
    // router.updateURLParams({'zoom':13,'lng':-83.15,'lat': 42.36});
    it('create router instace', function () {
        expect(router instanceof Router).toEqual(true);
    });
    it('adds two numbers together', function () {
        expect(1 + 2).toEqual(3);
    });
});

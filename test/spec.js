define(function(require) {
    /* 环境测试*/
    describe('环境测试', function() {
        it('env test', function() {
            expect(4+5).to.equal(9);
        })
    });

    //index.js test
    var test = require('./dist/test.js');
    var test1 = require('./dist/test1.js');

    describe('A test suit', function() {
        it('test1', function() {
            expect(test.test1()).to.equal('zak');
        });

        it('test2', function() {
            expect(test.test2()).to.equal('zak 2');
        });
    });

    describe('A test suit', function() {
        it('test1', function() {
            expect(test1.test1()).to.equal('zak');
        });

        it('test2', function() {
            expect(test1.test2()).to.equal('zak 2');
        });
    });

});

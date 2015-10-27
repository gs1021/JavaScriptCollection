var foo = require('./lesson6.js');
var should = require('should');

describe('test/lesson6.test.js', function () {
    it('should eq 55 when n==10', function () {
        foo.foo(10).should.equal(55);
    })
})
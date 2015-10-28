var Singletion = function () {
    var instance;
    function Init() {
        return {
            PublicMethod: function () {
                console.log('this is a public method');
            },
            PublicValue: 'this is a public value',
        }
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = Init();
            }
            return instance;
        }
    }
}

var single = new Singletion();
single.getInstance().PublicMethod();
single.getInstance().PublicValue;



var singletionTester = (function () {
    function Singletion(args) {
        var args = args || {};

        this.name = 'singletionTester';

        this.pointX = args.pointX || 5;

        this.pointY = args.poingY || 10;

        var instance;

        var _static = {
            name: 'static_singletionTester',
            getInstance: function (args) {
                if (!instance) {
                    instance = new Singletion(args);
                }

                return instance;
            }
        };

        return _static;
    }
})();

var single = singletionTester.getInstance({ pointX: 10 });
console.log(single.pointX);
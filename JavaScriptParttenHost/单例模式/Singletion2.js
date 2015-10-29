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


var days = ['1', '2', '3', '4'];
var i = 0;
do {
    var day = days[i++];
    console.log(day);
} while (day != '4')


var myVar = 1;
function test1() {
    alert(myVar);//undefine     函数作用域问题，变量会先从函数内部作用域找起，若内部无该变量，则从外部全局变量中寻找；在函数内部变量中找到，但在执行alert(myVar)时，未找到myVar对应的值；
    var myVar = 2;
    console.log('in function myVar value is ' + myVar);
    test2();
}
function test2() {
    alert(myVar);//1        在全局变量中找到；
    console.log('in global myVar value is ' + myVar);
}
test1();


var user = {
    FirstName: '',
    SencondName: ''
};

function User(first, sencond) {
    this.first = first;
    this.second = sencond;
}
User.prototype = {
    getFullName: function () {
        return this.first + ' ' + this.second;
    }
};
var u = new User('g', 's');
u.getFullName();


var arr = ['a', 'b', 'c', 'd', 'e'];
arr.pop();

try {
    var a = 0;
    var b = 1;
    var c = b / a;
} catch (e) {
    console.log('error');
    console.log('msg:' + e.message + '\nname:' + e.name + '\ndescripton:' + e.description + '\nstack:' + e.stack);
}
finally {
    console.log('finally');
}
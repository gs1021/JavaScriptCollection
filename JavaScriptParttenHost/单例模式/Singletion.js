var mySingletion = function () {
    var privateVar = 'this is a private value';

    function showPirvateValue() {
        console.log(privateVar);
    };

    return {
        PublicMethod: function () {
            showPirvateValue();
        },
        PublicValue: 'this is a public value',
    };
};


var singletion = new mySingletion();
singletion.PublicMethod();
singletion.PublicValue;



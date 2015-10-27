var foo = function (n) {
    if (n === 0)
        return 0;
    if (n === 1)
        return 1;
    
    return foo(n - 1) + foo(n - 2);
};

if (require.main === module) {
    //若直接执行 lesson6.js 则会执行此方法
    //从其他地方require则不会执行此处
    var n = Number(process.argv[2]);
    
    console.log('fibonacci(' + n + ') is', foo(n));
}

exports.foo = foo;

var stream = require('stream');
module.exports = function(func, meta) {

    var transformer = new stream.Transform({ objectMode: true });
    transformer._transform = function(obj, encoding, done) {
        // transform using custom function
        if (typeof func == "function") {
            obj = func(obj, meta);
        }
        var newObj=lowerObject(obj);
        //console.log(newObj);
        // pass object to next stream handler
        this.push(newObj);
        done();
    };

    return transformer;
}

function lowerObject(obj) {
    var key, keys = Object.keys(obj);
    var n = keys.length;
    var newobj = {}
    while (n--) {
        key = keys[n];
        newobj[key.toLowerCase()] = obj[key];
    }
    return newobj;
}

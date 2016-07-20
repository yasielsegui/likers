

var exec = require('child_process').exec;
console.log('heeeee');
var dependency_orderer = require('dependency-orderer');
console.log('aaaaaaaa');
var dependency_array;
exec('bower list -json', function(err,stdout,stderr){
    if(err) return console.log(err);
    dependency_array = dependency_orderer(JSON.parse(stdout));
    // do what you need with your dependency_array

    console.log(JSON.parse(dependency_array));
    /*
    for(if (var i=0; i< dependency_array.length; i++) {
        console.log()
    })

    */
});
 
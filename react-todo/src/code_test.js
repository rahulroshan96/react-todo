var fs = require('fs');

console.log("1")



function add(a,b, callback){
    setTimeout(()=>{console.log("Waiting")}, 3000);
    console.log(a);
    console.log(b);
    callback();
}


add(2,3,function(){
    console.log("Add executed");
})



// var promise = new Promise(function(resolve, reject) { 
//     // read from file
//     fs.readFile('App.js', 'utf8', function(err, data){ 
//         if(err){
//             reject()
//         }else{
//             resolve(13,2);
//         }
//     }); 
//     // const x = "geeksforgeeks"; 
//     // const y = "geeksforgeeks"
//     // if(x === y) { 
//     //   resolve(); 
//     // } else { 
//     //   reject(); 
//     // } 
//   }); 
    
//   promise. 
//       then(function (x,y) { 
//         console.log(x);
//         console.log('Success, You are a GEEK'); 
//       }).
//       then(function(x, y){
//           console.log(x);
//           console.log('Dummy then');
//       }). 
//       catch(function () { 
//           console.log('Some error has occured'); 
//       }); 


console.log("2")
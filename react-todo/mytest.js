var myList = ["input-0", "input-1", "input-2"]

for(var i=0;i<myList.length;i++){
    // console.log(myList[i])
    var x = myList[i].split('-')[1]
    console.log(x)
    // if (parseInt(x[1])===2){
    //     console.log("found 2")
    // }
}


var obj = {
    'name':'hello',
    "address":"indore"
}
var t = [1,2,3,]

var x = t.map(function(value, index){
    if(value===1 || value===3){
        return value
    }
})

console.log(x)
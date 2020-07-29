var item = ['a', 'b']

var newList = item.map((element)=>{
    return element + ' new'
})

var filterList = item.filter((element)=>{
    if(element.includes("a")){
        return element
    }
})

console.log(filterList)
var fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');
var axios = require('axios')



axios.post('http://localhost:8000/api/login',{
    username:'aviuser',
    password:'aviuser123'
}).then(function(response){
    console.log(response.data)
}).catch(function(e){
    console.log(e.response.statusText)
})


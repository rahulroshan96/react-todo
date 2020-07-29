import React, { Component } from 'react'
import { Segment, Container} from 'semantic-ui-react'
var data = [
    {
        "name":"Rahul",
        "id":1
    },
    {
        "name":"Rohit",
        "id":2
    },
    {
        "name":"Sharad",
        "id":3
    }
]

function Question(){
    return <h1>This is question</h1>
}

class Body extends Component {
    render(){
        let url = "http://dummy.restapiexample.com/api/v1/employees"
        fetch(url)
            .then(function(res){
                console.log(res)
            })
        const dataList = data.map((d, index)=> <div class="item" key={index}>{d.name}</div>)
        return <Segment style={{ padding: '2em 0em' }} vertical>
        <Container textAlign='justified' >
        <div class="ui ordered list">
            {dataList}
            </div>
        <Question />
        </Container>
        </Segment>
  };
}

export default Body;
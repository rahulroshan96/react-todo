import React, { Component,  } from 'react';
import {Container, Button, List, Segment} from 'semantic-ui-react'

class  Body extends Component {
    constructor(props){
        super(props);
        this.state = {
            counter:0,
            taskList:[],
        }
        this.increment = this.increment.bind(this)
        this.getTodoList = this.getTodoList.bind(this)
    }
    increment(props){
        this.setState((state, props) => ({
          counter: state.counter + 1
        }));
      }

    componentWillMount(props){
        this.getTodoList()
    }

    getTodoList(props){
        fetch('http://localhost:8000/api/task-list')
            .then(response => response.json())
            .then(data => this.setState({ 
                taskList: data 
            }));
    }
    render() {
        var tasks = this.state.taskList;
        return (
            <Container>
                <h1>This is counter number {this.state.counter}</h1>
                <Button onClick={this.increment}>Increment</Button>

                <Segment>
                    {/* In case if we want to introduce a button to list all the tasks */}
                {/* <Button onClick={this.getTodoList}>Get ToDo List</Button> */}
                <List>
                    {
                        tasks.map(function(task, index){
                            return (
                                <List.Item key={index}>{task.title}</List.Item>
                            )
                        })
                    }
                </List>
                </Segment>
            </Container>
        );
    }
}

export default Body;
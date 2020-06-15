import React, { Component,  } from 'react';
import {Container, Button, List, Segment, Form} from 'semantic-ui-react'

class  Body extends Component {
    constructor(props){
        super(props);
        this.state = {
            counter:0,
            // taskList:this.getTodoList() | [],
            taskList:[],
        }
        this.increment = this.increment.bind(this)
        this.getTodoList = this.getTodoList.bind(this)
        this.createTodoTask = this.createTodoTask.bind(this)
        this.onFormChange = this.onFormChange.bind(this)
        this.getCookie = this.getCookie.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
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

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    createTodoTask(event){
        event.preventDefault();
        var csrfToken = this.getCookie('csrftoken')
        fetch('http://localhost:8000/api/task-create/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken':csrfToken,
            },
            body: JSON.stringify({
                title: this.state.data.tinput,
                detail: this.state.data.ttext,
            })
            })
            .then(response => response.json())
            .then(data=>{
                this.getTodoList()
                console.log(event)
            });
    }

    onFormChange = e => this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value }
    });
    deleteTask(id){
        console.log(id)
        var csrfToken = this.getCookie('csrftoken')
        fetch(`http://localhost:8000/api/task-delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken':csrfToken,
            },
            })
            .then((response)=>{
                this.getTodoList()
            });
    }
    render() {
        var tasks = this.state.taskList;
        return (
            <Container>
                <h1>This is counter number {this.state.counter}</h1>
                <Button onClick={this.increment}>Increment</Button>
                <Segment>
                    <h3>New Task</h3>
                    <Form onSubmit={this.createTodoTask}> 
                        <Form.Input name="tinput" label="Title" onChange={this.onFormChange}/>
                        <Form.TextArea label="Details" 
                            placeholder="Enter the details" 
                            name="ttext" 
                            onChange={this.onFormChange}/>
                            <Button>Create</Button>
                    </Form>
                </Segment>

                <Segment>
                    {/* In case if we want to introduce a button to list all the tasks */}
                {/* <Button onClick={this.getTodoList}>Get ToDo List</Button> */}
                <List>
                    {
                        tasks.map((task, index)=>{
                            return (
                                <div>
                                    <span style={{float:'left'}}><Button onClick={() => this.deleteTask(task.id)}>Delete</Button></span>
                                    <List.Item key={index}>{task.title}</List.Item>
                                    <br/>
                                    {/* to access this object we need to use arrow function in map function */}
                                </div> 
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
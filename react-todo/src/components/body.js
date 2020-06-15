import React, { Component,  } from 'react';
import {Container, Button, List, Segment, Form} from 'semantic-ui-react'

class  Body extends Component {
    constructor(props){
        super(props);
        this.state = {
            counter:0,
            taskList:[],
            activeItem:{
            },
            create:true,

        }
        this.getTodoList = this.getTodoList.bind(this)
        this.createTodoTask = this.createTodoTask.bind(this)
        this.onFormChange = this.onFormChange.bind(this)
        this.getCookie = this.getCookie.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
        this.updateTask = this.updateTask.bind(this)
        this.onFormHandle = this.onFormHandle.bind(this)
        this.createNew = this.createNew.bind(this)
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
        if(this.state.create===true)
        {
            fetch('http://localhost:8000/api/task-create/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken':csrfToken,
            },
            body: JSON.stringify({
                title: this.state.activeItem.tinput,
                detail: this.state.activeItem.ttext,
            })
            })
            .then(response => response.json())
            .then(data=>{
                this.getTodoList()
                console.log(event)
                this.setState({
                    ...this.state,
                    create:true,
                    activeItem:{}
                })
            });
        }else{
            fetch(`http://localhost:8000/api/task-update/${this.state.activeItem.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken':csrfToken,
            },
            body: JSON.stringify({
                id:this.state.activeItem.id,
                title: this.state.activeItem.tinput,
                detail: this.state.activeItem.ttext,
            })
            })
            .then(response => response.json())
            .then(data=>{
                this.getTodoList()
                this.setState({
                    ...this.state,
                    create:true,
                    activeItem:{}
                })
            });
        }
    }

    onFormChange(e){
        this.onFormHandle(e)
        console.log(this.state.activeItem)
    }

    onFormHandle = e => this.setState({
        activeItem: {...this.state.activeItem, [e.target.name]: e.target.value }
    });

    updateTask = task => this.setState({
        ...this.state,
        create:false,
        activeItem:{
         id:task.id,
         tinput:task.title,
         ttext:task.detail
        }
    })
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
    createNew = () => {
        this.setState({
            ...this.state,
            create:true,
            activeItem:{}
        })
        console.log(this.state.activeItem)
    }
    render() {
        var tasks = this.state.taskList;
        return (
            <Container>
                <Segment>
                    <h3>New Task</h3>
                    <Form onSubmit={this.createTodoTask}> 
                        <Form.Input name="tinput" label="Title" 
                        placeholder="Enter the Title" 
                        value={this.state.activeItem.tinput!==undefined?this.state.activeItem.tinput:""}
                        onChange={this.onFormChange}/>
                        <Form.TextArea label="Details" 
                            placeholder="Enter the details" 
                            name="ttext" 
                            value={this.state.activeItem.ttext!==undefined?this.state.activeItem.ttext:""}
                            onChange={this.onFormChange}/>
                            {this.state.create ===true?<Button>Create Task</Button>:<div><Button>Update</Button>
                            <Button onClick={this.createNew}>Create New</Button></div>   }
                    </Form>
                </Segment>

                <Segment>
                    {/* In case if we want to introduce a button to list all the tasks */}
                {/* <Button onClick={this.getTodoList}>Get ToDo List</Button> */}
                {this.state.taskList.length===0?<h2>No Task Found</h2>:<h2>Tasks List</h2>}
                <List>
                    {
                        tasks.map((task, index)=>{
                            return (
                                <div>
                                    <span style={{float:'left'}}><Button onClick={() => this.deleteTask(task.id)}>Delete</Button></span>
                                    <span style={{float:'left'}}><Button onClick={() => this.updateTask(task)}>Update</Button></span>
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
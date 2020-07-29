import React, { Component } from 'react';
import { Container, Label , Grid, Image, Segment, Divider, Button, Header, Popup, List, Form, Menu} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Multiselect } from 'multiselect-react-dropdown';
import test from './css/splitwise.css'
import Update_delete from './Update_delete'

class Splitwise extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeItem:'',
            tinput:"",
            groupDetails:{
            },
            usersList:[],
            groupsList:[],
            dinput:'',
            checked:"",
            selectedValue:[],
            bills:[],
            currentBill:{
                bill_name:"",
                bill_id:""
            },
            update_group:{

            }

        }
        this.group = this.group.bind(this);
        this.getMenu = this.getMenu.bind(this);
        this.setActiveItemCreateGroup = this.setActiveItemCreateGroup.bind(this);
        this.createGroup = this.createGroup.bind(this)
        this.getCookie = this.getCookie.bind(this)
        this.notify = this.notify.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.setUsers = this.setUsers.bind(this)
        this.dropdownChange = this.dropdownChange.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.getGroups = this.getGroups.bind(this)
        this.setGroups = this.setGroups.bind(this)
        this.itemFunc = this.itemFunc.bind(this)
        this.getBills = this.getBills.bind(this)
        this.update_group = this.update_group.bind(this)
    }

    setUsers(data){
        var newUsersList = []
        newUsersList = data.map((d, index)=>{
            return {'key':d.username, 'text':d.username, 'value':d.id}
        })
        console.log("this is new users list")
        console.log(newUsersList)
        this.setState(
            {
                ...this.state,
                usersList:newUsersList
            }
        )
    }
    getUsers(){
        fetch('http://localhost:8000/api/users-list/')
            .then(response => response.json())
            .then(data => {
                this.setUsers(data)
            });
    }

    createNew = () => {
        console.log("create_group is done")
    }

    onChange = (event) =>{
        this.setState({checked: event.target.value})
        console.log(this.state.checked)
    }
    onFormChange = (e) =>{
        this.setState({
            ...this.state,
            tinput: {...this.state.tinput, [e.target.name]: e.target.value }
        })
    }
    getMenu(props){
        console.log("Get menu called")
        if(this.state.activeItem===''){
            return (
                <Container>
                    <h1 align='center'>Welcome to Splitwise Clone</h1>
                </Container>
            )
        }
        if(this.state.activeItem==='create_group'){
            return(
                <Container>
                    <Form onSubmit={this.createGroup}>
                    <Form.Input name="tinput" label="Title" 
                        placeholder="Enter the Group Name" 
                        onChange={this.onFormChange}/>
                        <Multiselect
                            options={this.state.usersList} // Options to display in the dropdown
                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="key" // Property name to display in the dropdown options
                            />
                        <Button>Create Group</Button>
                    </Form>
                </Container>
            )
        }
        if(this.state.activeItem==='extract_group'){
            return(
                <Container>
                    <Label>Billls List</Label>
                    <List divided relaxed>
                    {
                            this.state.bills.map((value, index)=>{
                                return (
                                    <List.Item>
                                        <List.Icon name='envelope square' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header as='a'>{value.bill_name}</List.Header>
                                            <List.Description as='a'>Updated 10 mins ago</List.Description>
                                            <List divided relaxed>
                                                {
                                                    value.splits.map((svalue, sindex)=>{
                                                        return(
                                                            <List.Item>
                                                            <List.Icon name='cut' size='small' verticalAlign='middle' />
                                                            <List.Content>
                                                        <List.Header as='a'>Share {sindex+1}</List.Header>
                                                                <List.Description as='a'>SplitAmount - {svalue.split_amount}</List.Description>
                                                                <List.Description as='a'>SplitUser - {svalue.split_user}</List.Description>
                                                            </List.Content>
                                                            </List.Item>
                                                        )
                                                    })
                                                }
                                            </List>
                                        </List.Content>
                                        </List.Item>
                                )
                            })
                        }
                    </List>
                </Container>
            )
        }
        if(this.state.activeItem==='update_group'){
            console.log("this is update")
            return <Update_delete g_name={this.state.update_group.g_name} g_id={this.state.update_group.g_id}/>
        }
    }
    onSelect(selectedList, selectedItem){
        this.setState({
            ...this.state,
            selectedValue:[...this.state.selectedValue, selectedItem]
        })
        console.log(this.state.tinput.tinput)
    }
    onRemove(selectedList, removedItem) {
        var oldList = this.state.selectedValue
        var index = oldList.indexOf(removedItem)
        oldList.splice(index, 1)
        this.setState({
            ...this.state,
            selectedValue:oldList
        })
    }
    getBills(group_number){
        console.log(group_number)
        fetch(`http://localhost:8000/api/bill-list/${group_number}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setBills(data)
            });
    }
    setBills(data){
        this.setState({
            bills:data
        })
    }
    dropdownChange(e){
        console.log(e.target)
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
    notify = (data) => {
        toast(`Group ${data.g_name} got created Successfully`)
    };
    setGroups(data){
        this.setState({
            ...this.state,
            groupsList:data.map((d, index)=>{
                return {
                    'g_name':d.g_name,
                    'g_id':d.id
                }
            })
        })
    }
    getGroups(){
        fetch('http://localhost:8000/api/groups-list/')
            .then(response => response.json())
            .then(data => {
                this.setGroups(data)
            });
    }
    createGroup(event){
        event.preventDefault();
        const that = this
        var csrfToken = this.getCookie('csrftoken')
            fetch('http://localhost:8000/api/group-create/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken':csrfToken,
            },
            body: JSON.stringify({
                g_name: this.state.tinput.tinput,
                users:this.state.selectedValue.map((value, index)=>{
                    return value.value
                })
                })
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data)
                that.notify(data)
                this.getGroups()
                that.setState({
                    ...this.state,
                    activeItem:"",
                    selectedValue:[],
                })
            });
    }

    componentWillMount(props){
        this.setState({
            activeItem:''
        })
        this.getUsers()
        this.getGroups()
    }

    setActiveItemCreateGroup(prop){
        this.setState({
            activeItem:"create_group"
        })
    }
    // fucking stupid way of ES6
    itemFunc = value => e => {
        e.preventDefault()
        var newGroups = this.state.groupsList.filter(function(item){
            if(item.g_name===value){
                return item
            }
        })
        console.log(newGroups[0].g_name)
        // this will set "bills" array
        this.getBills(newGroups[0].g_id)
        this.setState({
            activeItem:"extract_group"
        })
        // this.getBills()
        // getBills(group_id)
    }
    group(props){
        var g_list = this.state.groupsList.map((value, index)=>{
            return value
        })
        return (
            <Container>
                <Label size='big'>
                    Groups
                </Label>
                <List divided relaxed>
                {
                        g_list.map((value, index)=>{
                            return(
                                <div>
                                    <b>
                                    <Grid>
                                        <Grid.Column centered divided width="6">
                                        <List.Item key={index} onClick={this.itemFunc(value)}>
                                        <List.Icon name='globe' size='large' verticalAlign='middle'/>
                                            {value.g_name}
                                        </List.Item>
                                        </Grid.Column>
                                        <Grid.Column centered divided width="4">
                                            <Button.Group>
                                                <Button onClick={this.update_group(value)}>Edit</Button>
                                                <Button negative>Delete</Button>
                                            </Button.Group>
                                        </Grid.Column>
                                    </Grid>
                                    <Divider />
                                    </b>
                                </div>
                            )
                        })
                    }
                </List>
                <Button onClick={this.setActiveItemCreateGroup}>Create Group</Button>
            </Container>
                
        );
    }
    update_group = value => e => {
        this.setState({
            activeItem:"update_group",
            update_group:value
        })
    }
    render() {
        return (
            <Container>
                <ToastContainer />
                <Grid celled='internally'>
    <Grid.Row>
      <Grid.Column width={5}>
        {/* <Group/> */}
        {this.group()}
      </Grid.Column>
      <Grid.Column width={10}>
        {/* <MainItems activeItem={this.state.activeItem} /> */}
        {this.getMenu()}
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      {/* <Grid.Column width={4}>
        <Image src='/images/wireframe/image.png' />
      </Grid.Column> */}
      <Grid.Column width={10}>
      </Grid.Column>
    </Grid.Row>
  </Grid>
            </Container>
        );
    }
}

export default Splitwise;
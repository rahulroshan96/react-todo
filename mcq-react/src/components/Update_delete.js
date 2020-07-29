import React, { Component } from 'react';
import { Container, Label , Grid, Image, Segment, Button, List, Form, Menu} from 'semantic-ui-react';
import { Multiselect } from 'multiselect-react-dropdown';

class Update_delete extends Component {
    constructor(props){
        super(props)
        this.state = {
            usersList:[],
            groupsList:[],
            activeItem :'',
            g_name:'',
            g_update:'',
            groupUser:[],
            groupUserName:[],
            groupUserdict:[],
            groupName:'',
            gno:''
            
        }
        this.group = this.group.bind(this)
        this.getMenu = this.getMenu.bind(this)
        this.setGroups = this.setGroups.bind(this)
        this.updateGroup = this.updateGroup.bind(this)
        this.getMenu = this.getMenu.bind(this)
        this.getUser = this.getUser.bind(this)
        this.setUser = this.setUser.bind(this)
        this.onSelect = this.onSelect.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.getCookie = this.getCookie.bind(this)
        this.getGroupDetail = this.getGroupDetail.bind(this)
        this.setGroupDetail = this.setGroupDetail.bind(this)
        this.updateGroupFinal = this.updateGroupFinal.bind(this)
    }
    getGroups(){
        fetch('http://localhost:8000/api/groups-list/')
            .then(response => response.json())
            .then(data => {
                this.setGroups(data)
            });
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

    componentWillMount(props){
        console.log("Mount the users")
        this.getUser()
        this.getGroups()
    }

    setUser(users){
        this.setState({
            ...this.state,
            groupUserdict:users
        })
        var new_users = users.map((value,index)=>{
            // return value.username
            return {'key':value.username, 'value':value.id}
        })
        this.setState({
            ...this.state,
            groupUserName:new_users
        })
        
    }

    getUser(){
        fetch(`http://localhost:8000/api/users-list/`)
            .then(response => response.json())
            .then(data => {
                // console.log("user_id",data)
                this.setUser(data)
            });
        }

    setGroupDetail(value){
        console.log("val",value)
        console.log("dict",this.state.groupUserdict)
        var userlist = this.state.groupUserdict
        var userGroupList = userlist.filter((function(val){
            if(value.users.includes(val.id)){
                // console.log("val",val.username)
                return {'key':val.username, 'value':val.id}
                // return {'key':val.username}
            }
        }))
        console.log("UGL",userGroupList)
        let tempList = userGroupList.map((val,index)=>{
            return {'key':val.username, 'value':val.id}
        })
        
        this.setState({
            ...this.state,
            groupUser:tempList
        })
        console.log("GU",this.state.groupUser)
        this.setState({
            ...this.state,
            groupName:value.g_name
        })
    }

    getGroupDetail(value){
    fetch(`http://localhost:8000/api/get-group/${value+1}`)
        .then(response => response.json())
        .then(data => {
            this.setGroupDetail(data)
        });
        // console.log("gnov",value)
        this.setState({
            gno:value+1
        })
        // console.log("gno",this.state.gno)
    }

    updateGroup = value => e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            groupUser:[]
        })
        this.getGroupDetail(value)
        this.setState({
            activeItem:"update_group"
        })
    }
    group(){
        var g_list = this.state.groupsList.map((value, index)=>{
            return value.g_name
        })
  
        return(
         
            g_list.map((val,index)=>{
                return(
                <div>
                <List.Item key={index}>{val}</List.Item>
                <Button onClick = {this.updateGroup(index)}>Edit</Button>
                </div>
                )
            }
            )   
    )
    }
    updateGroupFinal = value => (event) =>{
        event.preventDefault();
        const that = this
        var csrfToken = this.getCookie('csrftoken')
            fetch(`http://127.0.0.1:8000/api/group-update/${value}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken':csrfToken,
            },
            body: JSON.stringify({
                g_name: this.state.groupName,
                users:this.state.groupUser.map((value, index)=>{
                    return value.value
                })
                })
            })
            .then(response => response.json())
            .then(data=>{
                console.log(data)
                // that.notify(data)
                this.getGroups()
                that.setState({
                    ...this.state,
                    groupName:"",
                    groupUser:[],
                })
            });
        // return (
        //     <h1>yay</h1>
        // )
    }
    onSelect(selectedList, selectedItem){
        this.setState({
            ...this.state,
            groupUser:[...this.state.groupUser, selectedItem]
        })
        console.log(this.state.groupUser)
    }
    onRemove(selectedList, removedItem) {
        var oldList = this.state.groupUser
        var index = oldList.indexOf(removedItem)
        oldList.splice(index, 1)
        this.setState({
            ...this.state,
            groupUser:oldList
        })
    }
    onFormChange = (e) =>{
        e.preventDefault()
        
        this.setState({
            ...this.state,
            groupName: e.target.value
        })
        console.log("Gname",this.state.groupName)

    }

    getMenu(){
        if (this.state.activeItem === ''){
        return (<h1>Update Group</h1>)
    }
        if (this.state.activeItem === 'update_group'){
            // console.log("1",this.state.groupUserName)
            // console.log("2",this.state.groupUser)
            // console.log("3",this.state.groupUserdict)
            // console.log("4 GN",this.state.groupName)

            return(
                <Container>
                    <Form onSubmit={this.updateGroupFinal(this.state.gno)}>
                    <Form.Input name="tinput" label='Title'
                        placeholder="Enter the Group Name" 
                        value = {this.state.groupName}
                        onChange={this.onFormChange}/>
                        <Multiselect
                            options={this.state.groupUserName} // Options to display in the dropdown
                            selectedValues={this.state.groupUser} // Preselected value to persist in dropdown
                            onSelect={this.onSelect} // Function will trigger on select event
                            onRemove={this.onRemove} // Function will trigger on remove event
                            displayValue="key" // Property name to display in the dropdown options
                            />
                        <Button>Update Group</Button>
                    </Form>
                </Container>
            )
            return(<h1>ok</h1>)
        }

            
        }
    
    render() {
        return (
    <Grid celled='internally'>
    <Grid.Row>
      <Grid.Column width={4}>
        {/* <Group/> */}
        {this.group()}
      </Grid.Column>
      <Grid.Column width={10}>
        {/* <MainItems activeItem={this.state.activeItem} /> */}
        {this.getMenu()}
      </Grid.Column>
    </Grid.Row>
    </Grid>
        );
    }
}

export default Update_delete;
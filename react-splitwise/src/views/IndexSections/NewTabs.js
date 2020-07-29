/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import "../../assets/css/custom_css.css"
import Select from 'react-select'



// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Form,
  FormGroup,
  InputGroup,
  InputGroupText,
  Input,
  InputGroupAddon,
  Nav,
  TabContent,
  Button,
  TabPane,
  Row,
  Col,
  Container
} from "reactstrap";
import axios from 'axios';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function getUsernameFromUserList(userList, userID){
  for(var i=0;i<userList.length;i++){
    if(userList[i].id === userID){
      return userList[i].username
    }
  }
}



class NewTabs extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userAction:"",
      groupAction:"",
      billAction:"",
      groupsList:[],
      billsList:[],
      usersList:[],
      iconTabs: 1,
      plainTabs: 1,
      activeGroup:{},
      createGroup:false,
      editGroup:false,
      selectedUsers:[]
    }
    this.getUsers = this.getUsers.bind(this)
    this.getGroups = this.getGroups.bind(this)
    this.listUsers = this.listUsers.bind(this)
    this.listGroups = this.listGroups.bind(this)
    this.getBills = this.getBills.bind(this)
    this.toggleNavs = this.toggleNavs.bind(this)
    this.deleteGroup = this.deleteGroup.bind(this)
    this.createGroup = this.createGroup.bind(this)
    this.editGroup = this.editGroup.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.createGroupAPI = this.createGroupAPI.bind(this)
    this.editGroupAPI = this.editGroupAPI.bind(this)
    this.viewGroup = this.viewGroup.bind(this)

    }
  
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    })
  }
  getGroups(){
    axios.get(`http://localhost:8000/api/groups-list/`)
      .then(res => {
        this.setState({ groupsList:res.data });
      })
  }
  getBills(){
    axios.get(`http://localhost:8000/api/bill-list-all/`)
      .then(res => {
        this.setState({ billsList:res.data });
      })
  }

  getUsers(){
    axios.get(`http://localhost:8000/api/users-list/`)
      .then(res => {
        this.setState({ usersList:res.data });
      })
  }
  deleteGroup = (e, value) => {
    e.preventDefault();
    console.log(value)
    this.deleteGroupApi(value)
    this.setState({
      activeGroup:{}
    })
  }

  deleteGroupApi(value){
    axios.delete(`http://localhost:8000/api/group-delete/${value.id}`)
      .then(res => {
        this.getGroups()
        this.getBills()
      })
  }
  editGroupAPI(e){
    e.preventDefault();
    console.log("Edit Group")
    var newData = {"g_name":this.state.activeGroup.g_name[0], "users":[]}
    console.log(this.state.activeGroup)
    if(this.state.editSelectedUsers!==undefined){
      for(var i=0;i<this.state.editSelectedUsers.length;i++){
        newData["users"].push(this.state.editSelectedUsers[i]["value"])
      }
    }else{
      newData["users"] = this.state.activeGroup.users
    }
    console.log("This is new data")
    console.log(newData)
    axios.post(`http://localhost:8000/api/group-update/${this.state.activeGroup.id}`,newData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    })
      .then(res => {
        console.log(res.data)
        this.getGroups()
        this.getBills()
        this.setState({
          createGroup:false,
          selectedUsers:[],
          createGroupName:"",
          activeGroup:{},
          editSelectedUsers:undefined,
          editGroup:false
        })
      })
  }
  createGroupAPI(e){
    e.preventDefault();
    console.log("Creating Group")
    var newData = {"g_name":this.state.createGroupName, "users":[]}
    for(var i=0;i<this.state.selectedUsers.length;i++){
      newData["users"].push(this.state.selectedUsers[i]["value"])
    }
    console.log("This is new data")
    console.log(newData)
    axios.post(`http://localhost:8000/api/group-create/`,newData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    })
      .then(res => {
        console.log(res.data)
        this.getGroups()
        this.getBills()
        this.setState({
          createGroup:false,
          selectedUsers:[],
          createGroupName:""
        })
      })
  }
  componentDidMount(){
    this.getGroups()
    this.getUsers()
    this.getBills()
  }
  listUsers(props){
    if(this.state!==undefined && this.state['userAction']!==undefined){
      var usersList = this.state.usersList
      return usersList.map((value, index)=>{
        return(
          <div key={index}>
            <Row className="justify-content-left">
              <Col lg="1">
                {index+1}
              </Col>
              <Col lg="5">
              <small className="text-uppercase text-muted font-weight-bold">
                {value.username}
              </small>
              </Col>
          </Row>
          </div>
        )
      })
    }else{
      return <div></div>
    }
  }
  listBills(props){

    if(this.state!==undefined && this.state.billsList!==undefined &&this.state.billsList!==[] && this.state.billsList.length>0){
      // var billsList = this.state.billsList
      return this.state.billsList.map((value, index)=>{
        return(
          <div key={index}>
            <Row className="justify-content-left">
              <Col lg="1">
                {index+1}
              </Col>
              <Col lg="5">
              <small className="text-uppercase text-muted font-weight-bold">
                {value.bill_name}
              </small>
              </Col>
          </Row>
          </div>
        )
      })
    }else{
      return <div></div>
    }
  }
  viewGroup(props){
    return (
      <div>
        {this.state.activeGroup.g_name}<br/><br/>
        <label>Users</label>

         {
           this.state.activeGroup.users.map((value,index)=>{
           return <li>{getUsernameFromUserList(this.state.usersList, value)}</li>
           })
         } 
         <label>Bills</label>
         {
           this.state.billsList.map((bill,index)=>{
             if(bill.group_name===this.state.activeGroup.id){
              return <li>{bill.bill_name}</li>
             }
           })
         } 
      </div>
    )
  }
  listGroups(props){
    if(this.state!==undefined && this.state['groupAction']!==undefined){
      console.log("executed list groups")
      var groupsList = this.state.groupsList
      return groupsList.map((value, index)=>{
        return(
          <div key={index}>
            <Row className="justify-content-left">
              <Col lg="6">
              <small className="text-uppercase text-muted font-weight-bold">
                {value.g_name}
              </small>
              </Col>
              <br/>
              <br/>
              <Col lg="2">
              <Button
              color="primary" 
              size="sm" 
              type="button"
              // onClick={() => {this.setState({activeGroup:value, createGroup:false})}}
              onClick={() => {this.setState({activeGroup:value, viewGroup:true, editGroup:false, createGroup:false})}}
              >
              View
            </Button>
            </Col>
              <Col lg="2">
              <Button
              color="primary" 
              size="sm" 
              type="button"
              // onClick={() => {this.setState({activeGroup:value, createGroup:false})}}
              onClick={() => {this.setState({activeGroup:value, editGroup:true, createGroup:false})}}
              >
              Edit
            </Button>
            </Col>
            <br/>
            <br/>
            <Col lg="2">
              <Button 
              color="danger" 
              size="sm" 
              type="button"
              onClick={e =>this.deleteGroup(e, value)}
              >
              Delete
            </Button>
            </Col>
          </Row>
          </div>
        )
      })
    }else{
      console.log("not executed list groups")
      return <div></div>
    }
  }
  editGroup(){
    return(
        <Form role="form" onSubmit={this.editGroupAPI}>
                        <FormGroup
                          className={classnames("mb-3", {
                            focused: this.state.emailFocused
                          })}
                        >
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Group Name"
                              type="text"
                              value={this.state.activeGroup.g_name}
                              onChange={(e)=> this.setState({activeGroup:{...this.state.activeGroup, g_name:[e.target.value]}})}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                        <label for="exampleSelectMulti">Select Users</label>
                        <Select 
                          options={this.state.usersList.map((value,index)=>{return {"label":value.username, "value":value.id}})} 
                          defaultValue={(this.state.activeGroup!==undefined&&this.state.activeGroup.users!==undefined)?this.state.activeGroup.users.map((id,index)=>{return {"label":getUsernameFromUserList(this.state.usersList, id), "value":id}}):[]}
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="label"
                          onChange={(e)=>{
                            this.setState({editSelectedUsers:e})
                          }}
                        />
                      </FormGroup>
                      <FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Update
                          </Button>
                        </div>
                        </FormGroup>
                      </Form>
    )
  }
  createGroup(){
    return(
        <Form role="form" onSubmit={this.createGroupAPI}>
                        <FormGroup
                          className={classnames("mb-3", {
                            focused: this.state.emailFocused
                          })}
                        >
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-circle-08" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Group Name"
                              type="text"
                              onChange={(e)=>this.setState({createGroupName:e.target.value})}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                        <label for="exampleSelectMulti">Select Users</label>
                        <Select 
                          options={this.state.usersList.map((value,index)=>{return {"label":value.username, "value":value.id}})} 
                          isMulti
                          className="basic-multi-select"
                          classNamePrefix="label"
                          onChange={e=>this.edithandleSelect(e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Create
                          </Button>
                        </div>
                        </FormGroup>
                      </Form>
    )
  }

  handleSelect = (e)=>{
    this.setState({
      selectedUsers:e
    })
  }
  render() {
    
    return (
      <>
        {JSON.stringify(this.state)}
      {/* <h3 className="h4 text-success font-weight-bold mb-4">Tabs</h3> */}
        <Row className="justify-content-center">
          <Col lg="3">
            {/* Tabs with icons */}
            {/* <div className="mb-3">
            </div> */}
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 1
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-cloud-upload-96 mr-2" />
                    Groups
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 2}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.iconTabs === 2
                    })}
                    onClick={e => this.toggleNavs(e, "iconTabs", 2)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-bell-55 mr-2" />
                    Bills
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"iconTabs" + this.state.iconTabs}>
                  <TabPane tabId="iconTabs1">
                    <p className="description">
                      {this.listGroups()}
                    </p>
                    <p className="description">
                      <Button 
                      color="danger" 
                      size="sm" 
                      type="button"
                      onClick={()=>{this.setState({createGroup:true, editGroup:false, activeGroup:{}})}}
                      >Create Group</Button>
                    </p>
                  </TabPane>
                  <TabPane tabId="iconTabs2">
                    <p className="description">
                      {this.listBills()}
                    </p>
                    
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
          <Col className="mt-5 mt-lg-0" lg="6">
            {/* Menu */}
            {/* <div className="mb-3">
            </div> */}
            <div className="nav-wrapper">
              <Nav
                className="nav-fill flex-column flex-md-row"
                id="tabs-icons-text"
                pills
                role="tablist"
              >
                <NavItem>
                  <NavLink
                    aria-selected={this.state.plainTabs === 1}
                    className={classnames("mb-sm-3 mb-md-0", {
                      active: this.state.plainTabs === 1
                    })}
                    // onClick={e => this.toggleNavs(e, "plainTabs", 1)}
                    href="#pablo"
                    role="tab"
                  >
                    Details
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <Card className="shadow">
              <CardBody>
                <TabContent activeTab={"plainTabs" + this.state.plainTabs}>
                  <TabPane tabId="plainTabs1">
                    {/* <p className="description">
                    {this.state.activeGroup!=={}?this.showGroup():""}
                    </p> */}
                    <p>
                      {this.state.createGroup?this.createGroup():""}
                    </p>
                    <p>
                      {this.state.editGroup?this.editGroup():""}
                    </p>
                    <p>
                      {this.state.viewGroup?this.viewGroup():""}
                    </p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default NewTabs;

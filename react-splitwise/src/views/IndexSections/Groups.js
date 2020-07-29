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
import axios from 'axios';

// reactstrap components
import { Button, Container, Row, Col,Modal } from "reactstrap";

const executeAPI = (props) =>{
  if(props.method === 'get'){
    axios.get(`https://localhost:8000/api/groups-list/`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }else{

  }
}


class Groups extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userAction:"",
      groupAction:"",
      groupsList:[],
      usersList:[]
    }
    this.getUsers = this.getUsers.bind(this)
    this.getGroups = this.getGroups.bind(this)
    this.listUsers = this.listUsers.bind(this)
    this.listGroups = this.listGroups.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.getModel = this.getModel.bind(this)
  }
  getGroups(){
    axios.get(`http://localhost:8000/api/groups-list/`)
      .then(res => {
        this.setState({ groupsList:res.data });
      })
  }

  getUsers(){
    axios.get(`http://localhost:8000/api/users-list/`)
      .then(res => {
        this.setState({ usersList:res.data });
      })
  }
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  componentDidMount(){
    this.getGroups()
    this.getUsers()
  }
  getModel(){
    return(
      <Modal
              className="modal-dialog-centered"
              isOpen={this.state.defaultModal}
              toggle={() => this.toggleModal("defaultModal")}
            >
              <div className="modal-header">
                <h6 className="modal-title" id="modal-title-default">
                  Type your modal title
                </h6>
                <button
                  aria-label="Close"
                  className="close"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  <span aria-hidden={true}>×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Far far away, behind the word mountains, far from the
                  countries Vokalia and Consonantia, there live the blind texts.
                  Separated they live in Bookmarksgrove right at the coast of
                  the Semantics, a large language ocean.
                </p>
                <p>
                  A small river named Duden flows by their place and supplies it
                  with the necessary regelialia. It is a paradisematic country,
                  in which roasted parts of sentences fly into your mouth.
                </p>
              </div>
              <div className="modal-footer">
                <Button color="primary" type="button">
                  Save changes
                </Button>
                <Button
                  className="ml-auto"
                  color="link"
                  data-dismiss="modal"
                  type="button"
                  onClick={() => this.toggleModal("defaultModal")}
                >
                  Close
                </Button>
              </div>
            </Modal>
    )
  }
  listUsers(props){
    if(this.state!==undefined && this.state['userAction']!==undefined && this.state.userAction === 'list'){
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
  listGroups(props){
    if(this.state!==undefined && this.state['groupAction']!==undefined && this.state.groupAction === 'list'){
      var groupsList = this.state.groupsList
      return groupsList.map((value, index)=>{
        return(
          <div key={index}>
            <Row className="justify-content-left">
              <Col lg="1">
                {index+1}
              </Col>
              <Col lg="3">
              <small className="text-uppercase text-muted font-weight-bold">
                
                {value.g_name}
              </small>
              </Col>
              <Col lg="2">
              <Button 
              color="primary" 
              size="sm" 
              type="button"
              onClick={() => this.toggleModal("defaultModal")}
              >
              Edit
            </Button>
            </Col>
            <Col lg="2">
              <Button color="danger" size="sm" type="button">
              Delete
            </Button>
            </Col>
          </Row>
          </div>
        )
      })
    }else{
      return <div></div>
    }
  }
  render() {
    return (
      <>
      
        <section
          className="section section-components pb-0"
          id="section-components"
        >
          <Container>
            <Row className="justify-content-center">
              <Col lg="12">
                {/* Basic elements */}
                
                <h2 className="mb-5">
                  <span>Basic Elements</span>
                </h2>
                {/* Buttons */}
                <h3 className="h4 text-success font-weight-bold mb-4">
                  Groups
                </h3>
                
                {/* Button styles */}
                <div>
                  
                <Button color="primary" type="button" onClick={() => this.setState({groupAction:"list"})} disabled={this.state.groupAction==='list'?true:false}>
                  Show Groups
                </Button>
                <Button color="danger" type="button" onClick={() => this.setState({groupAction:""})} disabled={this.state.groupAction===''?true:false}>
                  Hide Groups
                </Button>
                  {/* <ListGroups state={this.state}/> */}
                  {this.listGroups()}

                  <Button color="primary" type="button" onClick={() => this.setState({userAction:"list"})} disabled={this.state.userAction==='list'?true:false}>
                  Show Users
                </Button>
                <Button color="danger" type="button" onClick={() => this.setState({userAction:""})} disabled={this.state.userAction===''?true:false}>
                  Hide Users
                </Button>
                  {this.listUsers()}
                  {/* <ListUsers state={this.state}/> */}
                  {this.getModel()}
                  <Button
                    className="btn-icon btn-3 ml-1"
                    color="primary"
                    type="button"
                  >
                    <span className="btn-inner--icon mr-1">
                      <i className="ni ni-bag-17" />
                    </span>
                    <span className="btn-inner--text">With icon</span>
                  </Button>
                  <Button
                    className="btn-icon btn-2 ml-1"
                    color="primary"
                    type="button"
                  >
                    <span className="btn-inner--icon">
                      <i className="ni ni-bag-17" />
                    </span>
                  </Button>
                  {/* Button wizes */}
                  {/* <ListGroups action={this.state.groupAction}/> */}
                  <div className="mb-3 mt-5">
                    <small className="text-uppercase font-weight-bold">
                      Pick your size
                    </small>
                  </div>
                  <Button color="primary" size="sm" type="button">
                    Small
                  </Button>
                  <Button className="btn-1 ml-1" color="primary" type="button">
                    Regular
                  </Button>
                  <Button
                    color="primary"
                    size="lg"
                    type="button"
                    className="ml-1"
                  >
                    Large Button
                  </Button>
                </div>
                {/* Button colors */}
                <div className="mb-3 mt-5">
                  <small className="text-uppercase font-weight-bold">
                    Pick your color
                  </small>
                </div>
                <Button className="btn-1" color="primary" type="button">
                  Primary
                </Button>
                <Button className="btn-1 ml-1" color="info" type="button">
                  Info
                </Button>
                <Button className="btn-1 ml-1" color="success" type="button">
                  Success
                </Button>
                <Button className="btn-1 ml-1" color="warning" type="button">
                  Warning
                </Button>
                <Button className="btn-1 ml-1" color="danger" type="button">
                  Danger
                </Button>
                <Button
                  className="btn-1 btn-neutral ml-1"
                  color="default"
                  type="button"
                >
                  Neutral
                </Button>
                <div className="mb-3 mt-5">
                  <small className="text-uppercase font-weight-bold">
                    Outline
                  </small>
                </div>
                <Button className="btn-1" color="primary" outline type="button">
                  Outline-primary
                </Button>
                <Button
                  className="btn-1 ml-1"
                  color="info"
                  outline
                  type="button"
                >
                  Outline-info
                </Button>
                <Button
                  className="btn-1 ml-1"
                  color="success"
                  outline
                  type="button"
                >
                  Outline-success
                </Button>
                <Button
                  className="btn-1 ml-1"
                  color="warning"
                  outline
                  type="button"
                >
                  Outline-warning
                </Button>
                <Button
                  className="btn-1 ml-1"
                  color="danger"
                  outline
                  type="button"
                >
                  Outline-danger
                </Button>
                {/* Button links */}
                <div className="mb-3 mt-5">
                  <small className="text-uppercase font-weight-bold">
                    Links
                  </small>
                </div>
                <Button
                  className="text-default"
                  color="link"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Default
                </Button>
                <Button
                  className="text-primary ml-1"
                  color="link"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Primary
                </Button>
                <Button
                  className="text-info ml-1"
                  color="link"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Info
                </Button>
                <Button
                  className="text-success ml-1"
                  color="link"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Success
                </Button>
                <Button
                  className="text-warning ml-1"
                  color="link"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Warning
                </Button>
                <Button
                  className="text-danger ml-1"
                  color="link"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                >
                  Danger
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Groups;

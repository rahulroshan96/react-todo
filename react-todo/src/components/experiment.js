import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react'
import { Checkbox, Form } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios'
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

const ButtonMe = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: red;
  margin: 0 1em;
  padding: 0.25em 1em;
`


const initialStore = {}

class Experiment extends Component {

    constructor(props){
        super(props);
        this.state = {
          token:''
        }

        this.getToken = this.getToken.bind(this);
        this.createStore = this.createStore.bind(this);
    }
    getToken(){
      var that = this
        axios.post('http://localhost:8000/api/login', {
            username: 'aviuser',
            password: 'aviuser123'
          })
          .then(function (response) {
            console.log(response.data['token']);
            that.setState({
              token: response.data['token']
            })
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    createStore(){

    }

    render(props){
        this.createStore()
        this.getToken()
        return (
            <ButtonMe>Hello</ButtonMe>
        )
    }
}


var auth_state = {
  'token':'',
  'logged_in':false,
  'loading':false,
  'user':null
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const SIGNUP_USER = 'SIGNUP_USER'


export default Experiment;
import React, { Component } from 'react';
import Link from 'react-router-dom'

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:''
        }
    }

    render() {
        return (
            <div>
                <h1>This is Register</h1>           
            </div>
        );
    }
}

export default Register;
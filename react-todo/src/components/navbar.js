import React, { Component } from 'react';
import {Menu} from 'semantic-ui-react'

class Navbar extends Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
    
        return (
          <Menu>
            <Menu.Item
              name='editorials'
              active={activeItem === 'editorials'}
              onClick={this.handleItemClick}
            >
              Home
            </Menu.Item>
    
            <Menu.Item
              name='reviews'
              active={activeItem === 'reviews'}
              onClick={this.handleItemClick}
            >
              Todo
            </Menu.Item>
    
            <Menu.Item
              name='upcomingEvents'
              active={activeItem === 'upcomingEvents'}
              onClick={this.handleItemClick}
            >
              Login
            </Menu.Item>
            <Menu.Item
              name='upcomingEvents'
              active={activeItem === 'upcomingEvents'}
              onClick={this.handleItemClick}
            >
              SignUp
            </Menu.Item>

          </Menu>
          
        )
      }
}

export default Navbar;          
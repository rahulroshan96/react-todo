import React, { Component } from 'react'
import { Input, Menu, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='friends'
          active={activeItem === 'friends'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu>
        <Menu.Item>
            <Link to='/login'><Button>Login</Button></Link>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu>
          <Menu.Item>
            <Link to='/register'><Button>Register</Button></Link>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item
            name='Logout'
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Navbar;
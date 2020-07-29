import React from 'react';
import './App.css';
import { Button, Segment, Container} from 'semantic-ui-react'
import Body from './components/body'
import MenuExampleBasic from './components/header'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {counter:0};
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }

  increment(props){
    this.setState((state, props) => ({
      counter: state.counter + 1
    }));
  }

  decrement(props){
    this.setState((state, props)=>({
      counter: state.counter - 1
    }));
  }
  render(){
    return <Segment style={{ padding: '2em 0em' }} vertical>
    <Container textAlign='justified'>
    <MenuExampleBasic />
    <Body />
    <div>{this.state.counter}</div>
    <div>
      <Button onClick={this.increment}>Increment</Button>
    </div>
    <div style={{ padding: '2em 0em' }} vertical>
      <Button onClick={this.decrement}>Decrement</Button>
    </div>
    </Container>
    </Segment>
  }
}



export {App};


import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import {Segment, Container} from 'semantic-ui-react'
import Body from './components/body'

function App() {
  return (
    <Segment style={{ padding: '2em 0em' }} vertical>
    <Container textAlign='justified'>
    <Navbar/>
    <Body/>
    </Container>
    </Segment>
  );
}

export default App;

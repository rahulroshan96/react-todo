import React from 'react';
import './App.css';
import Navbar from './components/navbar'
import {Segment, Container} from 'semantic-ui-react'

function App() {
  return (
    <Segment style={{ padding: '2em 0em' }} vertical>
    <Container textAlign='justified'>
    <Navbar></Navbar>
    </Container>
    </Segment>
  );
}

export default App;

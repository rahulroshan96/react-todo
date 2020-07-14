import React from 'react';
import './App.css';
import {Segment, Container} from 'semantic-ui-react'
import Navbar from './components/navbar'
import {HashRouter as Router} from 'react-router-dom'
import Splitwise from './components/Splitwise'


function App() {
  return (
    <Router>
    <Segment style={{ padding: '2em 0em' }} vertical>
    <Container textAlign='justified'>
        <Navbar/>
        <Segment>
          <Splitwise/>
          {/* <Experiment/> */}
            {/* <Body/> */}

              {/* <Switch>
                <Route exact path="/" component={Experiment}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
              </Switch> */}

        </Segment>
     </Container>

     </Segment>
     </Router>
  );
}

export default App;

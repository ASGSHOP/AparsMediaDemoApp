import './App.css';
import CreateSession from './pages/createSession';
import JoinSession from './pages/joinSession';
import { Switch, Route } from 'react-router-dom';
import './index.css';
import NavBar from './components/navbar';
import React, { useState } from 'react';

function App() {
  const [hideNavbar, setHideNavbar] = useState(false);
  return (
    <div className="app">
      {!hideNavbar && <NavBar />}
      <Switch>
        <Route exact path="/">
          <CreateSession setHideNavbar={setHideNavbar} />
        </Route>
        <Route exact path="/n/:meetingId">
          <JoinSession setHideNavbar={setHideNavbar} />
        </Route>
        <Route exact path="/stream/:meetingId">
          <JoinSession setHideNavbar={setHideNavbar} />
        </Route>
        <Route exact path="/c/:meetingId">
          <JoinSession setHideNavbar={setHideNavbar} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

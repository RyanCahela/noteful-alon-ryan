import React, { Component } from 'react';

import FolderPage from '../components/FolderPage';
import MainPage from '../components/MainPage';
import NotePage from '../components/NotePage';
import Header from '../components/Header';
import NotFound from '../components/NotFound';
import AppContext from '../AppContext';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="App">
        <AppContext>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route path="/folders/:folderId" component={FolderPage} />
              <Route path="/notes/:noteId" component={NotePage} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </AppContext>
      </div>
    );
  }
}

export default App;

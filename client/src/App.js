import React from 'react'
import { BrowserRouter, Route,Switch } from "react-router-dom";
import Delete from './components/delete';
import Post from './components/post';
import Update from './components/update';
import Get from './components/get';
import Landing from './components/landing';
import './components/css/normalize.css'
import './components/css/app.css'

function App() {

  return (
  <BrowserRouter>
  <Switch>
    <Route exact path='/' component={Landing}/>
    <Route exact path='/read' component={Get}/>
    <Route exact path='/update' component={Update}/>
    <Route exact path='/delete' component={Delete}/>
    <Route exact path='/create' component={Post}/>
  </Switch>
  </BrowserRouter>
  );
}

export default App;

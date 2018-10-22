import React, { Component } from 'react';

import Button from '@material/react-button/dist';
import '@material/react-button/dist/button.css';

import TextField, {Input} from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';

import logo from './logo.svg';
import './App.css';
//import { Frame, Stack, PropertyControls, ControlType } from "framer";

//import {MDCRipple} from '@material/ripple';
//import {MDCTopAppBar} from '@material/top-app-bar/index';
//import FormField from '@material/form-field/dist';
//import Checkbox from '@material/checkbox/dist';


class App extends Component {
  state = {
    username: '',
    password: '',
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className='App-title'>MyPeople app</h1>
        </header>

        <form>
          <TextField
            label='Username'
            id='username'
            floatingLabelClassName='UserName'
            lineRippleClassName='mdc-line-ripple'
            className='mdc-text-field--box username'
            >
            <Input
              value={this.state.username}
              type='text'
              onChange={(e) => this.setState({username: e.target.value})}
              />
          </TextField>
          <TextField
            label='Password'
            id='password'
            floatingLabelClassName='mdc-floating-label'
            lineRippleClassName='mdc-line-ripple'
            className='mdc-text-field--box password'
            >
            <Input
              value={this.state.password}
              type='password'
              onChange={(e) => this.setState({password: e.target.value})}
              />
          </TextField>

          <Button>
            Cancel
          </Button>
          <Button className='button-alternate' raised>
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default App;

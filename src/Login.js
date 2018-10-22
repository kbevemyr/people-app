import React, { Component } from 'react';

import Button from '@material/react-button/dist';
import '@material/react-button/dist/button.css';

import TextField, {Input} from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';

//Unable to install latest
//import Checkbox from '@material/react-checkbox';
//import '@material/react-checkbox/dist/checkbox.css';

import '@material/react-switch/dist/switch.css';
import Switch from '@material/react-switch';

import './Login.css';

import { serverLogin } from './support.js';
import { Redirect, withRouter } from 'react-router-dom';

import authFlowService from './AuthService';

//import {MDCRipple} from '@material/ripple';
//import {MDCTopAppBar} from '@material/top-app-bar/index';
//import FormField from '@material/form-field/dist';
//import Checkbox from '@material/checkbox/dist';


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLoginEvent = this.handleLoginEvent.bind(this);
    this.state = {
      username: '',
      password: '',
      rememberme: false,
      redirectToPreviousRoute: false,
    };
  }

  handleCancelEvent(e) {
    console.log("user clicked Cancel button");
    return;
  }

  handleLoginEvent(e, callback) {
    console.log("Login.user to login is "+this.state.username+" ("+this.state.password+") ");

    authFlowService.authenticate(() => { this.setState({ redirectToPreviousRoute: true}) });

    serverLogin(this.state.username, this.state.password, this.state.rememberme).then(
      function(res) {
        console.log("got: "+ JSON.stringify(res));
        if (res.status === "error" && res.reason === "need oauth2") {
          console.log("Login.oauth2 needed.");
          window.location = res.auth_url;
        }
        else if (res.status === "error") {
          console.log("Login.login failed:"+res.reason);
          //TODO - följa upp error reason, tex fel lösenord
        }
        else {
          //const expiresDate = new Date('31 Dec 2018 00:00:00 PDT');
          console.log("Login.login successful: sid="+res.sid);
          //console.log("Login.next url: "+next_url);
          //callback(res.sid);
          //document.cookie = "sid="+res.sid+" ;path=/"+" ;expires="+expiresDate.toUTCString();
          authFlowService.state.sid = res.sid;
          authFlowService.authenticate();
          //window.location = "/#/private";
          //document.location.hash = "#/private";
        }
      });
  }

  render() {
    const { from } = this.props.location.state || { from : {patname: '/'} };
    const { redirectToPreviousRoute } = this.state;

    if (redirectToPreviousRoute) {
      console.log("Main.render "+from.pathname);
      return (<Redirect to={from} />);
    }

    console.log("Login.render "+this.props.location.state);

    return (
      <div className="Login">
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

          <div className='form-field-container'>
            <Switch
              nativeControlId='rememberme'
              checked={this.state.rememberme}
              onChange={(e) => this.setState({
                rememberme: e.target.checked})
              }
            />
          <label htmlFor='rememberme' className='rememberme'>
              Remember Me
            </label>
          </div>

          <div className='button-container'>
          <Button
            onClick={(e) => this.handleCancelEvent(e)}
          >
            Cancel
          </Button>
          <Button className='button-alternate' raised
            onClick={(e) => this.handleLoginEvent(e, this.props.callback)}
          >
            Login
          </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);

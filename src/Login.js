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

import { Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { loginUser } from './store/actions';

//import {MDCRipple} from '@material/ripple';
//import {MDCTopAppBar} from '@material/top-app-bar/index';
//import FormField from '@material/form-field/dist';
//import Checkbox from '@material/checkbox/dist';


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLoginEvent = this.handleLoginEvent.bind(this);
    this.handleLoginKatrinEvent = this.handleLoginKatrinEvent.bind(this);
    this.state = {
      username: '',
      password: '',
      rememberme: false,
      redirectToPreviousRoute: false,
    };
  }

  handleCancelEvent(e) {
    console.log("Login.user clicked Cancel button");
    return;
  }

  handleLoginEvent(e) {
    const { username, password, rememberme } = this.state;
    console.log("handleLoginEvent. creds "+ username+"/"+password);
    this.props.onLogin(this.state);
  }

  handleLoginKatrinEvent(e) {
    const katrin_cred = {
      username: "katrin",
      password: "test",
      rememberme: false,
    };
    this.setState(katrin_cred);
    this.props.onLogin(this.state);
  }

  render() {
    const { from } = this.props.location.state || { from : {patname: '/'} };
    const { redirectToPreviousRoute } = this.state;

    if (redirectToPreviousRoute) {
      console.log("Login.render redirect path "+from.pathname);
      return (<Redirect to={from} />);
    }

    return (

      <div className="Login">
        <form>
          <div className='button-container'>
            <Button className='button-alternate' raised
              onClick={(e) => this.handleLoginKatrinEvent(e)}
              >
              Katrin
            </Button>
          </div>
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
            onClick={(e) => this.handleLoginEvent(e)}
          >
            Login
          </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  username: state.login_name
});

const mapDispatchToProps = dispatch => ({
    onLogin: (creds) => {
      dispatch(loginUser(creds));
  },
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default withRouter(LoginContainer);

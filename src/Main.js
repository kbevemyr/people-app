import React, {Component} from "react";
//import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Route, NavLink, Redirect } from "react-router-dom";

import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';
import MDCTopAppBar from '@material/react-top-app-bar';
//import MaterialIcon from '@material/react-material-icon';
//import MaterialIcon2 , {colorPalette} from 'material-icon-react';

import authFlowService from './AuthService';

import Public from "./Public";
import Login from "./Login";
import Private from "./Private";

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
      authFlowService.isAuthenticated() ?
      <Component {...props} />
      :
      <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
    )} />
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      sid: '',
      gotOauth2: false,
    };
  }

  signOut() {
    authFlowService.logout();
    this.props.history.replace('/');
  }

  handleServerMsg(msg) {
    let result = JSON.parse(data);
    // Check if msg is OAUTH2 callback, then update the login-toggle.
    this.setState({gotOauth2: true});
  }

  render() {
    return (
        <div id='main'>
          <div className="header">
            <MDCTopAppBar
              className="mdc-top-app-bar--fixed"
              title='MyPeople by GT16'
              navigationIcon={<NavLink to="/public">public</NavLink>}
              actionItems={[
                  <NavLink to="/private">private</NavLink>
              ]}
            />
          </div>

          <div className="content mdc-top-app-bar--fixed-adjust">
            <Route path="/public" component={Public} />
            <Route path="/login" component={Login} />
            <SecretRoute path="/private" component={Private} />
          </div>

          <div>
            <strong>got message from server: {this.state.gotOauth2}</strong>

            <WebSocket url='ws://musen.bevemyr.com:8888/people/webchannel/'
              onMessage={this.handleServerMsg.bind(this)}/>
          </div>
        </div>
    );
  }
}

export default Main;

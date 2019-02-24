import React, {Component} from "react";
import { Route, NavLink, withRouter } from "react-router-dom";

import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';
import MDCTopAppBar from '@material/react-top-app-bar';
//import MaterialIcon from '@material/react-material-icon';
//import MaterialIcon2 , {colorPalette} from 'material-icon-react';

import OAuthLogin from './OAuthLogin';

import Public from "./Public";
import Login from "./Login";
import Private from "./Private";

import { connect } from 'react-redux';
//import { loginUser } from './store/actions';

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleOauthLoginEvent = this.handleOauthLoginEvent.bind(this);
    this.handleOauthCompleteEvent = this.handleOauthCompleteEvent.bind(this);
  }

  handleOauthCompleteEvent() {
    console.log("Main.handleOauthCompleteEvent");

  }

  handleOauthLoginEvent(url) {
    console.log("Main.handleOauthLoginEvent redirectURL = "+url);

  }

  signOut() {

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
            <Route path="/private" render={() =>
              this.props.isAuthenticated ? (
                  <Private />
                ) : (
                  <Login />
                )
              } />
          </div>

          {this.props.inOauth > 0 && (
            <OAuthLogin url={this.props.oauth_urls[0].oauth_url} />
          )}

      </div>

    );
  }
}


function mapStateToProps(state) {
  const { isAuthenticated, errorMessage , inOauth , oauth_urls } = state;

  return {
    isAuthenticated,
    errorMessage,
    inOauth,
    oauth_urls,
  };
}

const MainContainer = connect(
  mapStateToProps
)(Main);

export default withRouter(MainContainer);

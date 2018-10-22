//import React, { Component } from 'react';
import './support.js';


class AuthService {
  constructor() {
    console.log("AuthService.constructor");
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);

    this.state = {
      createdAt: Date.now(),
      sid: null,
      verifiedCredentials: false,
    };
  }

  authenticate(cb) {
    console.log('AuthService.authenticate() '+this.state.sid);
    setTimeout(cb, 100);
  }

  logout(cb) {
    console.log('AuthService.logout()');
    this.state = {sid: null};
    setTimeout(cb, 100);
  }

  isAuthenticated() {
    console.log('AuthService.isAuthenticated()');
    console.log("AuthService.sid "+this.state.sid);
    return (this.state.sid);
  }

  needOauth(oauthurl) {

  }

}

const authFlowService = new AuthService();

export default authFlowService;

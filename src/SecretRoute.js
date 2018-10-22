import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Peoplelist from './Peoplelist';

import authFlowService from './AuthService';

class SecretRoute extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Route render={(props) => (
        authFlowService.isAuthenticated() === true ?
          <Peoplelist />
          : <Redirect to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )}
        />
      );
    }
}

export default SecretRoute;

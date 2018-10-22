import React, {Component} from "react";

import  { serverGet } from "./support.js";
import { Route, Link, withRouter } from "react-router-dom";

import authFlowService from './AuthService';
import PeopleList from './Peoplelist';

import OauthPopup from 'react-oauth-popup';

function getMyUser(obj) {
  //const usersid = document.cookie.replace(/(?:(?:^|.*;\s*)sid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  const usersid = authFlowService.state.sid;
  var ru = window.location.origin+"/private";

  console.log("Private.getMyUser: sid = "+usersid);
  console.log("Private.getMyUser: redirect_url = "+ru);

  //serverGet("get_user", {sid: usersid, redirect_url: ru} ).then(
  serverGet("get_user", {sid: usersid} ).then(
    function(s) {
      if (s.status === "error" && s.reason === "unknown sid") {
        console.log("login needed");
        window.location = "#/Login";
        return;
      }
      else if (s.status === "error" && s.reason === "need oauth2") {
        console.log("Private.getMyUser: need oauth2");
        window.location = s.auth_url;
      }
      else {
          console.log(JSON.stringify(s.user));
          //$("#user").append("<pre>"+JSON.stringify(s.user, undefined, 2)+"</pre>");
          obj.setState({userprofile: s.user});
      }
    }
  );
}


function verifyCredientials(obj) {
  //const usersid = document.cookie.replace(/(?:(?:^|.*;\s*)sid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  const ru = window.location.origin+"/people/code.html";
  const usersid = authFlowService.state.sid;

  console.log("Private.getMyFiles: sid = "+usersid);
  console.log("Private.getMyFiles: redirect_url = "+ru);

  serverGet("add_credentials", {sid: usersid, redirect_url: ru} ).then(
      function(s) {
          console.log(JSON.stringify(s, undefined, 2));
          serverGet("verify_credentials", {sid: usersid, redirect_url: ru} ).then(
              function(s) {
                  if (s.status === "error" &&
                      s.reason === "need oauth2") {
                      console.log("Private.verifyCredientials: need oauth2");
                      console.log("redirecting to:"+s.auth_url);
                      window.location = s.auth_url;
                      // trigger the outh-popup with s.auth_url as url parameter
                  }
                  else if (s.status === "error") {
                      console.log(JSON.stringify(s, undefined, 2));
                  }
                  else
                      console.log(JSON.stringify(s, undefined, 2));
                      authFlowService.authenticate();
              });
      });
}


class Private extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userprofile: '',
    };
  }

  componentDidMount() {
    getMyUser(this);
    verifyCredientials();
  }

  render() {
    console.log("Private.render: "+this.props.match.url);

    return (
      <div>
        <pre>
          Den inloggade delen av världen.
        </pre>

        <h2>{this.state.userprofile.username}</h2>
        <ul>
          <li><Link to={`${this.props.match.url}/peoplelist`}>Peoplelist</Link></li>
        </ul>

        <Route path={`${this.props.match.path}/:name`} render= {({match}) => (
          <div><h3>{match.params.name}</h3>
            <PeopleList></PeopleList>
          </div>
        )} />
      </div>
    );
  }
}

export default withRouter(Private);

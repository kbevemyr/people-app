import React, {Component} from "react";

import  { serverGet } from "./support.js";
//import { Route, Link, withRouter } from "react-router-dom";

import authFlowService from './AuthService';

import PList from '@material-ui/core/List';
import PItem from '@material-ui/core/ListItem';
import PItemText from '@material-ui/core/ListItemText';
//import PItemIcon from '@material-ui/core/ListItemIcon';

function getFiles(obj) {
  //const usersid = document.cookie.replace(/(?:(?:^|.*;\s*)sid\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  const usersid = authFlowService.state.sid;
  var ru = window.location.origin+"/private";

  console.log("Peoplelist.getMyUser: sid = "+usersid);
  console.log("Peoplelist.getMyUser: redirect_url = "+ru);

  //serverGet("get_user", {sid: usersid, redirect_url: ru} ).then(
  serverGet("get_files", {sid: usersid} ).then(
    function(s) {
      if (s.status === "error" && s.reason === "unknown sid") {
        console.log("login needed");
        window.location = "#/Login";
        return;
      }
      else if (s.status === "error" && s.reason === "need oauth2") {
        console.log("Peoplelist.getFiles: need oauth2");
        window.location = s.auth_url;
      }
      else {
          console.log(JSON.stringify(s, undefined, 2));
          obj.setState({data: s});
      }
    }
  );
}


class Peoplelist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gotlist: false,
      data: [],
    };
  }

  componentDidMount() {
    getMyFiles(this);
  }

  render() {
    return (
      <div>
      <pre>{JSON.stringify(this.state.data, undefined,2)}</pre>
      <PList>
        <PItem>
          <PItemText inset primary="Martin">

          </PItemText>
        </PItem>
      </PList>
      </div>
    );
  }
}

export default Peoplelist;

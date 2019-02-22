import { serverLogin, serverGet, serverPost } from '../support.js';

export const OAUTH_REQUEST = 'OAUTH_REQUEST';
export const OAUTH_SUCCESS = 'OAUTH_SUCCESS';
export const OAUTH_FAILURE = 'OAUTH_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export const FETCH_REQUEST = 'FETCH_REQUEST';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const FETCH_USERDATA = 'FETCH_USERDATA';
export const FETCH_FILES = 'FETCH_FILES';
export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';


// Action Creators - Functions that create actions
export function needOauth (name, url) {
  return {
    type: OAUTH_REQUEST,
    peer: name,
    oauth_url: url,
  };
}

export function gotOauth (name) {
  return {
    type: OAUTH_SUCCESS,
    peer: name,
  };
}

export function unsuccessfulOauth (name, message) {
  return {
    type: OAUTH_FAILURE,
    peer: name,
    message
  };
}

export function getUser (creds) {
  return {
      type: LOGIN_REQUEST,
      creds
  }
}

export function receiveLogin (sid) {
  return {
      type: LOGIN_SUCCESS,
      login_sid: sid
  };
}

export function loginFailed (message) {
  return {
      type: LOGIN_FAILURE,
      message
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

function getData() {
  return {
    type: FETCH_REQUEST,
  }
}

function gotData(data) {
  return {
    type: FETCH_SUCCESS,
    data //https://github.com/reduxjs/redux/blob/master/examples/async/src/actions/index.js
  }
}

function noData() {
  return {
    type: FETCH_FAILURE,
  }
}

function gotUserdata(data) {
  return {
    type: FETCH_USERDATA,
    data
  }
}

function gotConsent(data) {
  return {
    type: FETCH_USERDATA,
    data
  }
}

function gotFiles(data) {
  return {
    type: FETCH_FILES,
    data
  }
}

function gotAccounts(data) {
  return {
    type: FETCH_ACCOUNTS,
    data
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    //set sid to ''
    // remove cookie
    //localStorage.removeItem('id_token')
    //localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}

// Backend functions for auth
export function loginUser (creds) {
  console.log("actions. loginUser "+JSON.stringify(creds));

  return dispatch => {
    dispatch(getUser(creds))

    return serverLogin(creds.username, creds.password, creds.rememberme).then(
      (res) => {
        //console.log("got: "+ JSON.stringify(res));
        if (res.status === "error") {
          //console.log("Login.login failed:"+res.reason);
          dispatch(loginFailed(res.reason))
        }
        else {
          //console.log("Login.login successful: sid="+res.sid);
          document.cookie = "sid="+res.sid+" ;path=/";
          dispatch(receiveLogin(res.sid));
          //dispatch(getMyUser(res.sid));
          dispatch(addCredentials(res.sid, "Google"));
          dispatch(addCredentials2(res.sid, "Swedbank_sandbox"));
        }
      }).catch(err => console.log("Error in loginUser ", err))
  }
}

export function doOauth (peer, url) {
  console.log("actions. doOauth "+JSON.stringify(url));

  return dispatch => {
    dispatch(needOauth(peer, url))
  }
}

export function getMyUser (sid){
  console.log("actions. getMyUser "+JSON.stringify(sid));

  return dispatch => {

      serverGet("get_user", {sid: sid}).then(
        (res) => {
          //console.log("got: "+ JSON.stringify(res));
          if(res.status === "error" && res.reason === "unknown sid") {
            console.log("getMyUser. login needed "+res.auth_url);
          }
          else if(res.status === "error" && res.reason === "need oauth2") {
            console.log("getMyUser. need oauth2 "+res.auth_url);
            let peer = "Google"; //todo
            dispatch(needOauth(peer, res.auth_url));
          }
          else if (res.status === "error") {
              console.log(JSON.stringify(res, undefined, 2));

            }
            else {
              //console.log("reducer.getMyUser: "+JSON.stringify(res, undefined, 2));
              dispatch(gotUserdata(res.user));
            }
          }
        )
    }
  }

// Backend functions for oauth
export function addCredentials (userid, peer){
  const ru = window.location.origin+"/people/code.html";

  return dispatch => {
    serverGet("add_credentials", {sid: userid, redirect_url: ru }).then(
      (res) => {
        if(res.status === "error") {
          console.log("addCredientials. failed "+res.reason);
        }
        else {
          console.log("addCredientials. OK ");
          dispatch(verifyCredentials(userid, peer));
        }
      }
    )
  }
}

export function addCredentials2 (userid, peer){
  // TODO: hardcoded
  const cred = {
    sid: userid,
    name: "Swedbank_sandbox",
    auth_url: "https://psd2.api.swedbank.com/psd2/authorize?bic=SANDSESS&state=Swedbank_sandbox&client_id=l71c07d4a09f2d4367904e7dd1be1f2ca6&redirect_uri=https://www.gt16.se/people/code.html&response_type=code&scope=PSD2sandbox",
    redirect_url: "https://www.gt16.se/people/code.html",
    validate_url: "https://www.googleapis.com/drive/v3/about?fields=user&access_token=",
    client_id: "l71c07d4a09f2d4367904e7dd1be1f2ca6",
    client_secret: "94e3d9a490d14833819b20ade6001305",
    get_token_url: "https://psd2.api.swedbank.com/psd2/token",
    grant_type: "authorization_code",
  };

  return dispatch => {
    serverPost("add_credentials2", cred).then(
      (res) => {
        if(res.status === "error") {
          console.log("addCredientials2. failed "+res.reason);
        }
        else {
          console.log("addCredientials2. OK ");
          dispatch(verifyCredentials(cred.sid, cred.name));
        }
      }
    )
  }
}


export function addConsent (userid, peer){
  // This is more initiate consent flow, POST consent,
  //get it validated and then start asking for accoutinformation
  //https://psd2.api.swedbank.com/sandbox/v1/consents
  // TODO: hardcoded

  const headers = [
    "Date: "+(new Date()).toUTCString(),
    "X-Request-ID: 7b51fb86-4424-4aed-be7f-5995bf0a93ed", //UUID
    //"Authorization: ", // Header and Token as value added by serverside
  ];

  const consent = {
    sid: userid,
    name: peer,
    method: "post",
    fun: "https://psd2.api.swedbank.com/sandbox/v1/consents?bic=SANDSESS",
    addToken: false,
    bic: "SANDSESS",
    "content-type": "application/json",
    addAuthorizationHeader: true,
    headers: headers,
  };

  return dispatch => {
    serverPost("get_fun", consent).then(
      (res) => {
        if(res.status === "error" && res.reason === "need oauth2") {
          console.log("verifyCredientials. need oauth2 "+res.auth_url);
          dispatch(needOauth(peer, res.auth_url))
        }
        else if(res.status === "error") {
          console.log("addConsent. failed "+res.reason);
        }
        else {
          console.log("addConsent. OK res: "+JSON.stringify(res));
          dispatch(gotConsent(res));
        }
      }
    )
  }
}


export function verifyCredentials (sid, cred_name){
  const ru = window.location.origin+"/people/code.html";

  return dispatch => {
    serverGet("verify_credentials", {sid: sid, redirect_url: ru , name: cred_name}).then(
      (res) => {
        if(res.status === "error" && res.reason === "need oauth2") {
          console.log("verifyCredientials. need oauth2 "+res.auth_url);
          dispatch(needOauth(cred_name, res.auth_url))
        }
        else if (res.status === "error") {
            console.log(JSON.stringify(res, undefined, 2));

        }
        else {
          console.log(JSON.stringify(res, undefined, 2));
          //dispatch(serverOk(res.sid))
        }
      }
    )
  }
}



export function getMyFiles (sid) {
// serverGet("get_files", {sid: usersid}
console.log("actions. getMyFiles "+JSON.stringify(sid));

return dispatch => {

    serverGet("get_files", {sid: sid}).then(
      (res) => {
        //console.log("getMyFiles.got: "+ JSON.stringify(res));
        if(res.status === "error" && res.reason === "unknown sid") {
          //console.log("getMyFiles. login needed "+res.auth_url);
        }
        else if(res.status === "error" && res.reason === "need oauth2") {
          //console.log("getMyFiles. need oauth2 "+res.auth_url);
          dispatch(needOauth("Google", res.auth_url))
        }
        else if (res.status === "error") {
            //console.log(JSON.stringify(res, undefined, 2));

          }
          else {
            //console.log("reducer.getMyFiles: "+JSON.stringify(res.files, undefined, 2));
            dispatch(gotFiles(res.files));
          }
        }
      )
  }
}

export function getMyAccounts (sid) {
  console.log("actions. getMyAccounts "+JSON.stringify(sid));
  return dispatch => {};
}

export function getMyAccounts_SHB (sid) {
  console.log("actions. getMyAccounts_SHB "+JSON.stringify(sid));

  let headers = [
    "accept: application/json",
    "authorization: MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI1",
    "psu-ip-address: 158.174.4.9",
    "tpp-request-id: 8173c2f7-5893-4480-a76e-a44634bd518f",
    "tpp-transaction-id: fc3eb8c7-3d5e-44ba-93fd-a136b2c5d1f9",
    "x-ibm-client-id: 76fc4f35-6883-462c-8e17-7946ab44c70c"
  ];
  let args = {
    sid: sid,
    name: "Swedbank_sandbox",
    fun: "https://sandbox.handelsbanken.com/openbanking/psd2/v1/accounts",
    method: "get",
    addToken: false,
    "content-type": "application/json",
    headers: headers,
  };

  return dispatch => {
    serverPost("get_fun", args).then(
      (res) => {
        if(res.status === "error") {
          console.log("getMyAccounts_SHB. failed "+res.reason);
        }
        else {
          console.log("getMyAccounts_SHB. OK ");
          dispatch(gotAccounts(JSON.parse(res.body)));
        }
      }
    )
  }
}

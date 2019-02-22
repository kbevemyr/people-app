import { gotOauth } from './store/actions';

const serverUrlDefault = 'wss://www.gt16.se/ws.yaws';
let reduxstore;
let socketServerUrl;

export function configSocket(store, url = serverUrlDefault) {
  reduxstore = store;
  socketServerUrl = url;
}

export function initSocket() {
  let socket: ?WebSocket;
  if (socket) {
    socket.close();
    socket = null;
  }
  socket = new WebSocket(socketServerUrl);

  socket.onopen = function (e) {
    console.log("WebSocket.onopen")
    let msg = {'method': 'subscribe', 'params': {'WriterId': 'mypeople'}};
    socket.send(JSON.stringify(msg));
  };

  socket.onmessage = function(e) {
    // Check if msg is OAUTH2 callback, then update the login-toggle.
    console.log("WebSocket.got message: "+JSON.stringify(e.data));
    if (e.type === 'message') {
      let msg = JSON.parse(e.data);

      switch (msg.method) {
        case 'oauth' :
          console.log("oauth credential received from "+ msg.credentials.name);
          console.log("the store :"+ JSON.stringify(reduxstore));
          reduxstore.dispatch(gotOauth(msg.credentials.name));
          break;
        case 'welcome' :
          console.log("welcome received");
          break;
        case 'subscribe' :
          console.log("subscribe received");
          break;
        default :
          console.log("Unhandled message form server on websocket: "+JSON.stringify(msg));
      }
    }
  };
}

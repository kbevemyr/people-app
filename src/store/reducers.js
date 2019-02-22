import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
  OAUTH_REQUEST, OAUTH_SUCCESS, OAUTH_FAILURE,
  FETCH_REQUEST,FETCH_SUCCESS, FETCH_FAILURE,
  FETCH_USERDATA,FETCH_FILES, FETCH_ACCOUNTS,
} from './actions';

// state for auth
const initialstate = {
  inLogin: false,
  isAuthenticated: false,
  inOauth: 0,
  oauth_urls: [],
  sid: "",
  userprofile: "",
  files: [],
  accounts: [],
}

// check for cookie ? true : false

function rootReducer (state = initialstate, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        inLogin: true,
        isAuthenticated: false,
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        inLogin: false,
        isAuthenticated: true,
        errorMessage: '',
        sid: action.login_sid,
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        inLogin: false,
        isAuthenticated: false,
        errorMessage: action.message
      })

    case LOGOUT_REQUEST:
      return state;
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: false
      })
    case LOGOUT_FAILURE:
      return state;

    case OAUTH_REQUEST:
      return Object.assign({}, state, {
        oauth_urls: [...state.oauth_urls, {name: action.peer, oauth_url: action.oauth_url}],
        inOauth: state.inOauth+1,
      })
    case OAUTH_SUCCESS:
    // Called when the websocket get a oauth
      //todo remove the object with name === action.peer from state.oauth:urls

      return Object.assign({}, state, {
        oauth_urls: state.oauth_urls.filter(item => item.name !== action.peer),
        inOauth: state.inOauth-1,
      })
    case OAUTH_FAILURE:
      return Object.assign({}, state, {
        oauth_urls: [],
        inOauth: 0,
      })

    case FETCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case FETCH_SUCCESS:
    // Called when the websocket get a oauth
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      })
    case FETCH_FAILURE:
      return state

    case FETCH_USERDATA:
      return Object.assign({}, state, {
        isFetching: false,
        userprofile: action.data.username,
      })

    case FETCH_FILES:
      return Object.assign({}, state, {
        isFetching: false,
        files: action.data.files,
      })

      case FETCH_ACCOUNTS:
        return Object.assign({}, state, {
          isFetching: false,
          accounts: action.data.accounts,
        })

    default:
      return state;
  }
}


export default rootReducer;

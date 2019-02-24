import React, {Component} from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { verifyCredentials, getMyUser } from './store/actions';
import { initSocket } from './WebSocketService';

import PeopleList from './Peoplelist';
import SwedbankAccountList from './SwedbankAccountList';
import SHBAccountList from './SHBAccountList';


class Private extends Component {
  constructor(props) {
    super(props);
    //init(this.props.store);
    this.props.getTheUser(this.props.sid);
    initSocket();
  }

  render() {
    return (
      <div id='privatemain'>
        <div id='privateheader'>
        <h2>{this.props.username} ({this.props.sid})</h2>
        <ul>
          <li><Link to={`${this.props.match.url}/peoplelist`}>Peoplelist</Link></li>
          <li><Link to={`${this.props.match.url}/swedbank`}>Swedbank</Link></li>
          <li><Link to={`${this.props.match.url}/shb`}>Handelsbanken</Link></li>
        </ul>
        </div>

        <div id='privatecontent'>
        <Route path={`${this.props.match.path}/shb`} component= {({match}) => (
          <div><h3>Your SHB Accounts</h3>
            <SHBAccountList></SHBAccountList>
          </div>
        )} />

      <Route path={`${this.props.match.path}/swedbank`} component= {({match}) => (
          <div><h3>Your Swedbank Accounts</h3>
            <SwedbankAccountList></SwedbankAccountList>
          </div>
        )} />

      <Route path={`${this.props.match.path}/peoplelist`} component= {({match}) => (
          <div><h3>Your files at Google</h3>
            <PeopleList></PeopleList>
          </div>
        )} />
        </div>
      </div>
    );
  }
}

// Store handling

const mapStateToProps = state => ({
  username: state.userprofile,
  sid: state.sid,
});

const mapDispatchToProps = dispatch => ({
    getTheUser: (sid) => {
      dispatch(getMyUser(sid));
  },
});

const PrivateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Private);

export default withRouter(PrivateContainer);

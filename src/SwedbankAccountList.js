import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getMyAccounts, addConsent } from './store/actions';

//import { Route, Link, withRouter } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';

class SwedbankAccountList extends Component {
  constructor(props) {
    super(props);
    this.props.getTheAccounts(this.props.sid);
  }

  render() {
    return (
      <div>
      <List>
        {this.props.accounts.map(x =>
          (
            <ListItem>
              <ListItemIcon><StarIcon /></ListItemIcon>
              <ListItemText inset primary={x.accountId} />
            </ListItem>
          ))}
      </List>
      </div>
    );
  }
}


// Store handling

const mapStateToProps = state => ({
  sid: state.sid,
  accounts: state.accounts,
});

const mapDispatchToProps = dispatch => ({
    getTheAccounts: (sid) => {
      //dispatch(getMyAccounts_Swedbank(sid));
      dispatch(addConsent(sid, "Swedbank_sandbox"));
  },
});

const SwedbankAccountListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SwedbankAccountList);

export default withRouter(SwedbankAccountListContainer);

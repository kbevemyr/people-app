import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getMyAccounts_SHB } from './store/actions';

//import { Route, Link, withRouter } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';

/*
  Authorization: MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI2

  A customer with 2 accounts. Each account has 5 transactions.
  Every field in the first account has the maximum allowed field length.
  The fields in the second account have the minimum allowed field length.
*/

class SHBAccountList extends Component {
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
      dispatch(getMyAccounts_SHB(sid));
  },
});

const SHBAccountListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SHBAccountList);

export default withRouter(SHBAccountListContainer);

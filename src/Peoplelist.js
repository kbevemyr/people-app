import React, {Component} from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getMyFiles } from './store/actions';

//import { Route, Link, withRouter } from "react-router-dom";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';

class Peoplelist extends Component {
  constructor(props) {
    super(props);
    this.props.getTheFiles(this.props.sid);
  }

  render() {
    return (
      <div>
      <List>
        {this.props.files.map(x =>
          (
            <ListItem>
              <ListItemIcon><StarIcon /></ListItemIcon>
              <ListItemText inset primary={x.name} />
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
  files: state.files,
});

const mapDispatchToProps = dispatch => ({
    getTheFiles: (sid) => {
      dispatch(getMyFiles(sid));
  },
});

const PeoplelistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Peoplelist);

export default withRouter(PeoplelistContainer);

import React, {Component} from "react";

class Home extends Component {
  state = {
    theuser: '',
  };

  render() {
    return (
      <div>
        <h2>What is this?</h2>
        <p>This is an app where you can list all the people you have in
        your Google contacts. </p>
        <div id='theuser'>
        </div>
      </div>
    );
  }
}

export default Home;

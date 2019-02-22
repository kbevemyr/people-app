import { Component } from 'react';
import ReactDOM from 'react-dom';

class OAuthLogin extends Component {
  constructor(props) {
    super(props);
    this.containerEl = document.createElement('div');
    this.externalWindow = null;
  }

  componentDidMount() {
    console.log("OAuthLogin.url:  "+this.props.url);
    // open a new browser window and store a reference to it
    this.externalWindow = window.open(this.props.url, '', 'width=600,height=400,left=200,top=200');

    // append the container <div> (that has props.children appended to it)
    //this.externalWindow.documment.body.appendChild(this.containerEl);
  }

  render() {
    // New window with a cancel Button
    // append props.children to the container <div> that isn't mounted anywhere yet
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }

  componentWillUnmount() {
    // this will fire when this.state.showWindowProtal in the parent component becomes false
    //this.externalWindow.close();
  }

}

export default OAuthLogin;

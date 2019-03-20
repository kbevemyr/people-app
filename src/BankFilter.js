import React, {Component} from "react";
import { Route, Link, withRouter } from "react-router-dom";

@import "@material/form-field/mdc-form-field";
@import "@material/checkbox/mdc-checkbox";

class BankFilter extends Component {
  constructor(props) {
    super(props);
  }

  handleSetBankFilterEvent(e) {
    const bankfilter = {
      nordea: false,
      handelsbanken: true,
      seb: false,
      swedbank: false,
    };
    this.props.filter = bankfilter;
  }

render() {
  return (
    <div>
      <form>

        {this.props.filter.map(x =>
          (
        <div className='form-field-container'>
          <Switch
            nativeControlId='bf'+x
            checked={this.state.rememberme}
            onChange={(e) => this.setState({
              rememberme: e.target.checked})
            }
          />
          <label htmlFor='bf'+x className='bf'+x>
            {x}
          </label>
        </div>
      ))}

      <div className='button-container'>
        <Button className='button-alternate' raised
          onClick={(e) => this.handleSetBankFilterEvent(e)}
          >
          GO
        </Button>
      </div>

      </form>
    </div>

  )
}

// Store handling

const mapStateToProps = state => ({
  filter: state.filter.banks,
});

const mapDispatchToProps = dispatch => ({
    getTheUser: (sid) => {
      dispatch(getMyUser(sid));
  },
});

const BankFilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BankFilter);

export default withRouter(BankFilterContainer);

import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };
  componentDidUpdate(previousProps) {
    const { error, alert,message } = this.props;
    if (error != previousProps.error) {
        if (error.msg.name) alert.error(`Name Error:${error.msg.name.join()}`);
        if (error.msg.email) alert.error(`Email Error:${error.msg.email.join()}`);
        if (error.msg.message) alert.error(`Message Error:${error.msg.message.join()}`);
    }
    if(message!=previousProps.message){
      if(message.addLead)alert.success(message.addLead)
      if(message.deleteLead)alert.success(message.deleteLead)
      if(message.updateLead)alert.success(message.updateLead)
    }
  }
  render() {
    return <Fragment />;
  }
}
const mapStateToProps = (state) => ({
  error: state.errors,
  message:state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));

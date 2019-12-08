import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leads";
import store from "../../store";
import { CURRENT_LEAD } from "../../actions/types";
export class Form extends Component {
  static propTypes = {
    addLead: PropTypes.func.isRequired,
    currentLead: PropTypes.object.isRequired
  };
  //   state = {
  //     name: "",
  //     email: "",
  //     message: ""
  //   };
  onChange = (e) => {
    const lead = this.props.currentLead;
    store.dispatch({
      type: CURRENT_LEAD,
      payload: { ...lead, [e.target.name]: e.target.value }
    });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const lead = this.props.currentLead;
    this.props.addLead(lead);
  };
  render() {
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Lead</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.props.currentLead.name}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={this.onChange}
              value={this.props.currentLead.email}
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={this.props.currentLead.message}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currentLead: state.leads.currentLead //first is the leads reducer,next is the leads prop from the state reducer returns
});
export default connect(mapStateToProps, { addLead })(Form);

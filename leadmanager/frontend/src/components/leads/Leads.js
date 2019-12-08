import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLeads, delLead } from "../../actions/leads";
import store from "../../store";
import { CURRENT_LEAD } from "../../actions/types";
export class Leads extends Component {
  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func.isRequired,
    delLead: PropTypes.func.isRequired
  };
  showCurrent = false;
  currentSelectedId = 0;
  currentLead = (id) => {
    let lead;
    if (this.currentSelectedId === id && this.showCurrent) {
      lead = { id: "", name: "", email: "", message: "", create_at: "" };
      this.showCurrent = false;
    } else {
      lead = this.props.leads.filter((lead) => lead.id === id)[0];
      this.showCurrent = true;
      this.currentSelectedId = id;
    }
    store.dispatch({ type: CURRENT_LEAD, payload: lead });
  };
  componentDidMount() {
    this.props.getLeads();
  }
  render() {
    return (
      <Fragment>
        <h2>the leads</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>MESSAGE</th>
              <th>POSTED</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.leads.map((lead) => (
              <tr key={lead.id} onClick={this.currentLead.bind(this, lead.id)}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.message}</td>
                <td>{new Date(lead.create_at).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={this.props.delLead.bind(this, lead.id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  leads: state.leads.leads //first is the leads reducer,next is the leads prop from the state reducer returns
});
export default connect(mapStateToProps, { getLeads, delLead })(Leads);

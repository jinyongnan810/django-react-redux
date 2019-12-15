import axios from "axios";
import {
  GET_LEADS,
  DEL_LEAD,
  ADD_LEAD,
  UPDATE_LEAD,
  GET_ERRORS,
  CURRENT_LEAD
} from "./types";
import { createMessage, returnErrors } from "./messages";

// get leads
export const getLeads = () => (dispatch) => {
  axios
    .get("/api/leads/")
    .then((res) => {
      dispatch({ type: GET_LEADS, payload: res.data });
    })
    .catch((err) => {
      const error = {
        msg: err.response.data,
        status: err.response.status
      };
      dispatch({
        type: GET_ERRORS,
        payload: error
      });
    });
};

//del leads
export const delLead = (id) => (dispatch) => {
  axios
    .delete(`/api/leads/${id}/`)
    .then((res) => {
      dispatch(createMessage({ deleteLead: "Lead Deleted" }));
      dispatch({ type: DEL_LEAD, payload: id });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// add leads
export const addLead = (data) => (dispatch) => {
  const clearLead = { id: "", name: "", email: "", message: "" };
  if (data.id) {
    axios
      .get(`/api/leads/${data.id}/`)
      .then((res) => {
        const newLead = res.data;
        newLead.name = data.name;
        newLead.email = data.email;
        newLead.message = data.message;
        axios
          .put(`/api/leads/${data.id}/`, newLead)
          .then((res) => {
            dispatch(createMessage({ updateLead: "Lead Updated" }));
            dispatch({ type: UPDATE_LEAD, payload: res.data });
            dispatch({ type: CURRENT_LEAD, payload: clearLead });
          })
          .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
          });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  } else {
    axios
      .post("/api/leads/", data)
      .then((res) => {
        dispatch({ type: ADD_LEAD, payload: res.data });
        dispatch(createMessage({ addLead: "Lead Added" }));
        dispatch({ type: CURRENT_LEAD, payload: clearLead });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  }
};

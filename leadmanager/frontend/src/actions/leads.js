import axios from "axios";
import {
  GET_LEADS,
  DEL_LEAD,
  ADD_LEAD,
  UPDATE_LEAD,
  GET_ERRORS,
  CURRENT_LEAD
} from "./types";
import { createMessage } from "./messages";

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

// add leads
export const addLead = (data) => (dispatch) => {
  const clearLead = { id: "", name: "", email: "", message: "", create_at: "" };
  if (data.id) {
    axios
      .put(`/api/leads/${data.id}/`, data)
      .then((res) => {
        dispatch(createMessage({ updateLead: "Lead Updated" }));
        dispatch({ type: UPDATE_LEAD, payload: res.data });
        dispatch({ type: CURRENT_LEAD, payload: clearLead });
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
  } else {
    axios
      .post("/api/leads/", data)
      .then((res) => {
        dispatch({ type: ADD_LEAD, payload: res.data });
        dispatch(createMessage({ addLead: "Lead Added" }));
        dispatch({ type: CURRENT_LEAD, payload: clearLead });
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
  }
};

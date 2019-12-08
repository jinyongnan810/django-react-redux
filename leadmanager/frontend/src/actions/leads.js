import axios from "axios";
import { GET_LEADS, DEL_LEAD, ADD_LEAD, UPDATE_LEAD } from "./types";

// get leads
export const getLeads = () => (dispatch) => {
  axios
    .get("/api/leads/")
    .then((res) => {
      dispatch({ type: GET_LEADS, payload: res.data });
    })
    .catch((err) => console.error(err));
};

//del leads
export const delLead = (id) => (dispatch) => {
  axios
    .delete(`/api/leads/${id}/`)
    .then((res) => {
      dispatch({ type: DEL_LEAD, payload: id });
    })
    .catch((err) => console.error(err));
};

// add leads
export const addLead = (data) => (dispatch) => {
  if(data.id){
    axios
    .put(`/api/leads/${data.id}/`, data)
    .then((res) => {
      dispatch({ type: UPDATE_LEAD, payload: res.data });
    })
    .catch((err) => console.error(err));
  }else{
    axios
    .post("/api/leads/", data)
    .then((res) => {
      dispatch({ type: ADD_LEAD, payload: res.data });
    })
    .catch((err) => console.error(err));
  }
};


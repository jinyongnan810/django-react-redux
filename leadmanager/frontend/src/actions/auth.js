import axios from "axios";
import { returnErrors } from "./messages";
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from "./types";

// check user and load user
export const load_user = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });
  //get token from state
  const token = getState().auth.token;
  //set headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (token) {
    config["headers"]["Authorization"] = `Token ${token}`;
  }
  axios
    .get("/api/auth/user", config)
    .then((res) => {
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((e) => {
      dispatch(returnErrors(e.response.data, e.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

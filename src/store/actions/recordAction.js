import apiClient, { setAuthHeader } from "../../utils/client";
import {
  ADD_RECORD,
  GET_ALLRECORDS,
  GET_ERRORS,
  GET_REPORT,
  POST_LOADING,
} from "./types";

export const handle_addRecord = (data, toast) => async (dispatch) => {
  const endpoint = "/user/addcrimeRecords";
  const token = localStorage.getItem("jwtToken");
  setAuthHeader(token);
  const response = await apiClient.put(endpoint, data);
  if (response.ok) {
    dispatch({
      type: ADD_RECORD,
      payload: response.data,
    });
    return toast.success("Record Saved");
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    });
    return toast.error(response.data);
  }
};
export const handle_csvRecord = (data, toast) => async (dispatch) => {
  const newData = data.map((data) => ({
    user: {
      name: data.Username,
      email: data.Email,
      address: data.Address,
      id: data.UserID,
      sex: data.Sex,
      religion: data.Religion,
      dob: data.DOB,
      occupation: data.Occupation,
      documentType: data.DocumentType,
      documentId: data.DocumentID,
    },
    crimeNature: data.CrimeNature,
    crimeStatus: data.Status,
    imprisonment: data.Imprisionment,
    bailAmount: data.BailAmount,
    RegisteredBy: data.RegisteredBy,
  }));

  const endpoint = "/user/uploadcsv";
  const token = localStorage.getItem("jwtToken");
  setAuthHeader(token);
  const response = await apiClient.post(endpoint, newData);
  if (response.ok) {
    return toast.success("Record saved.");
  }
  return toast.error("Failed to Save Records.");
};

export const handle_getAllRecord = (toast) => async (dispatch) => {
  dispatch(setPostloading());
  const endpoint = "/user/crimeRecords";
  const response = await apiClient.get(endpoint);

  if (response.ok) {
    dispatch({
      type: GET_ALLRECORDS,
      payload: response.data,
    });
  } else {
    toast.error(response.data);
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    });
  }
};

//handle report
export const handle_getReport = (toast) => async (dispatch) => {
  const endpoint = "/user/reports";
  const token = localStorage.getItem("jwtToken");
  setAuthHeader(token);
  const response = await apiClient.get(endpoint);
  if (response.ok) {
    dispatch({
      type: GET_REPORT,
      payload: response.data,
    });
  } else {
    toast.error(response.data);
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    });
  }
};

//set post loading
export const setPostloading = () => {
  return {
    type: POST_LOADING,
  };
};

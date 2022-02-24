import apiClient, { postClient, setAuthHeader } from "../../utils/client";
import {
  ADD_POST,
  DEL_POST,
  GET_ALLPOST,
  GET_ERRORS,
  POST_LOADING,
} from "./types";

export const handle_createPost = (data, toast) => async (dispatch) => {
  const endpoint = "/createpost";
  const token = localStorage.getItem("jwtToken");
  setAuthHeader(token);
  const response = await postClient.post(endpoint, data);
  if (response.ok) {
    dispatch({
      type: ADD_POST,
      payload: response.data,
    });
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    });
  }
};

export const handle_getAllPost = () => async (dispatch) => {
  dispatch(setPostloading());
  const endpoint = "/posts";
  const response = await apiClient.get(endpoint);
  if (response.ok) {
    dispatch({
      type: GET_ALLPOST,
      payload: response.data,
    });
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: response.data,
    });
  }
};

export const handle_deletePost = (id, toast) => async (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  setAuthHeader(token);
  const response = await apiClient.delete(`/post?id=${id}`);
  if (response.ok) {
    console.log(response.data);

    dispatch({
      type: DEL_POST,
      payload: response.data,
    });
    toast.success("Post deleted Succesfully.");
  } else {
    toast.error("Failed to delete post.");
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

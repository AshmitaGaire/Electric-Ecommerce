import * as actionTypes from "./ActionTypesEvent";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const createEventRequest = () => ({
  type: actionTypes.EVENT_CREATE_REQUEST,
});

const createEventSuccess = (event) => ({
  type: actionTypes.EVENT_CREATE_SUCCESS,
  payload: event,
});

const createEventFail = (error) => ({
  type: actionTypes.EVENT_CREATE_FAIL,
  payload: error,
});

//create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch(createEventRequest());

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${server}/event/create-event`, // Adjust the API endpoint for creating events
      newForm,
      config
    );
    dispatch(createEventSuccess(data.event)); // Assuming the response returns the created event
    toast.success("Event created successfully!");
  } catch (error) {
    dispatch(createEventFail(error.response.data.message));
    toast.error(error.response.data.message);
  }
};



// Delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.DELETE_EVENT_REQUEST,
    });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: actionTypes.DELETE_EVENT_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_EVENT_FAILED,
      payload: error.response.data.message,
    });
  }
};

// Get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_ALL_EVENTS_REQUEST,
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: actionTypes.GET_ALL_EVENTS_SUCCESS,
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_EVENTS_FAILED,
      payload: error.response.data.message,
    });
  }
};



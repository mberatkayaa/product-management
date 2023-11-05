import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ResultBuilder from "./resultBuilder";

const rb = new ResultBuilder();

export const serverSideFetch = async ({
  absoluteEndPoint,
  endPoint,
  method = "GET",
  headers,
  body,
  noAuth = false,
  fetchFn,
  processDataFn,
  bodyFn,
  errorFn,
}) => {
  let buffer;
  let session;

  endPoint = process.env.NODE_SERVER_ADDR + endPoint;
  endPoint = absoluteEndPoint || endPoint;
  headers = headers || {
    "Content-Type": "application/json",
  };

  if (!noAuth) {
    buffer = await _try(getServerSession.bind(null, authOptions));
    if (buffer.isError) {
      return rb.reset().error("Authentication Error", buffer.payload).getObj();
    }
    session = buffer;
    headers["Authorization"] = `Basic ${btoa(JSON.stringify(session))}`;
  }

  return await clientSideFetch({ endPoint, method, headers, body, bodyFn, errorFn, fetchFn, processDataFn });
};

export const clientSideFetch = async ({ endPoint, method = "GET", headers, body, fetchFn, processDataFn, bodyFn, errorFn }) => {
  let buffer;

  headers = headers || {
    "Content-Type": "application/json",
  };

  const options = { method, headers };
  if (body) options.body = body;

  if (fetchFn) {
    buffer = await _try(async () => fetchFn());
  } else {
    buffer = await _try(async () => await fetch(endPoint, options));
  }
  if (buffer.isError || !buffer.ok) {
    return rb.reset().error("Fetch Error", buffer.payload).getObj();
  }
  const response = buffer;

  if (processDataFn) {
    buffer = await _try(async () => await processDataFn(response));
  } else {
    buffer = await _try(async () => await response.json());
  }
  if (buffer.isError) {
    return rb.reset().error("Data Error", buffer.payload).getObj();
  }
  const data = buffer;

  let _body;
  let message;
  if (bodyFn) {
    _body = bodyFn(data);
  } else {
    _body = data.body;
  }

  if (response.ok) {
    return rb.reset().ok().body(_body).getObj();
  }
  if (errorFn) {
    message = errorFn(data);
  } else {
    message = data.result.message;
  }
  return rb.reset().error(message).body(_body).getObj();
};

export const handleClientSideFetch = async ({
  endPoint,
  method = "GET",
  contentType = "application/json",
  body,
  fetchFn,
  processDataFn,
  bodyFn,
  errorFn,
  dispatch,
}) => {
  try {
    dispatch({ type: "FETCH" });
    const response = await clientSideFetch({ endPoint, method, contentType, body, fetchFn, processDataFn, bodyFn, errorFn });
    if (response.ok) dispatch({ type: "FETCH_DONE", payload: response });
    else dispatch({ type: "FETCH_ERROR", payload: response, message: response.message });
  } catch (err) {
    const fakeResponse = { ok: false, error: true, message: "An error occured.", body: {} };
    dispatch({ type: "FETCH_ERROR", payload: fakeResponse, message: fakeResponse.message });
  }
};

export const getDefaultReducer = () => {
  const initialState = {
    loading: false,
    error: null,
    success: false,
    response: null,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH":
        return { ...state, loading: true, error: null, success: false, response: null };
      case "FETCH_DONE":
        return { ...state, loading: false, error: null, success: true, response: action.payload };
      case "FETCH_ERROR":
        return { ...state, loading: false, error: action.message, success: false, response: action.payload };
      case "RESET":
        return { ...initialState };
      default:
        return state;
    }
  };

  return { reducer, initialState };
};

const _try = async (fn) => {
  let result;
  try {
    result = await fn();
  } catch (err) {
    result = { isError: true, payload: err };
  }
  return result;
};

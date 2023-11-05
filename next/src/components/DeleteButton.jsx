"use client";

import { useReducer, useState } from "react";

import Swal from "react-sweetalert2";

import HookInvoker from "./HookInvoker";
import Loading from "./Loading";
import Redirect from "./Redirect";

import { getDefaultReducer, handleClientSideFetch } from "@/misc/fetchOperations";

const { reducer, initialState } = getDefaultReducer();

function DeleteButton({ title, text, icon, confirmText, cancelText, endPoint, redirect, method, children, className }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const clickHandler = () => {
    setShowConfirmation(true);
  };

  const confirmHandler = async () => {
    await handleClientSideFetch({ endPoint, method, dispatch });
  };

  const resolveHandler = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <button className={className} onClick={clickHandler}>
        {children}
      </button>
      {state.response && <HookInvoker response={state.response} />}
      {state.error && <Swal title="Oops!" text={state.error} show={true} icon="error" onResolve={setError.bind(this, null)} />}
      <Redirect show={state.success && redirect} title={"Deleted!"} text={"Redirecting..."} route={redirect} />
      <Loading show={state.loading} title={"Deleting..."} text={"Please wait while saving changes..."} />
      {showConfirmation && (
        <Swal
          title={title}
          text={text}
          show={true}
          icon={icon}
          showConfirmButton={true}
          showCancelButton={true}
          confirmButtonText={confirmText}
          cancelButtonText={cancelText}
          focusCancel={true}
          onConfirm={confirmHandler}
          onResolve={resolveHandler}
        />
      )}
    </>
  );
}

export default DeleteButton;

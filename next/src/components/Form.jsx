"use client";

import { useReducer } from "react";

import HookInvoker from "@/components/HookInvoker";
import Redirect from "@/components/Redirect";
import Link from "next/link";

import Swal from "react-sweetalert2";

import Loading from "./Loading";

import { getDefaultReducer, handleClientSideFetch } from "@/misc/fetchOperations";

const { reducer, initialState } = getDefaultReducer();

function Form({ endPoint, method, redirect, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const obj = Object.fromEntries(formData.entries());
    const body = JSON.stringify(obj);
    await handleClientSideFetch({ endPoint, method, body, dispatch });
    return;
  };

  return (
    <>
      {state.response && <HookInvoker response={state.response} />}
      <Link href={redirect} className="h-screen w-screen absolute bg-black bg-opacity-50 top-0 left-0"></Link>
      {state.error && <Swal title="Oops!" text={state.error} show={true} icon="error" onResolve={() => dispatch({ type: "RESET" })} />}
      <Loading show={state.loading} title={"Saving..."} text={"Please wait while saving changes..."} />
      <Redirect show={state.success} title={"Saved!"} text={"Redirecting..."} route={redirect} />
      <form
        onSubmit={submitHandler}
        className="bg-white w-[min(500px,80%)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-7 shadow-2xl shadow-cyan-800 rounded-md"
      >
        {children}
      </form>
    </>
  );
}

export default Form;

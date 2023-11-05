"use client";

import { useRef, useState } from "react";

import { signIn, useSession } from "next-auth/react";

import Icon from "@mdi/react";
import { mdiEye, mdiEyeOff } from "@mdi/js";

import ErrorComponent from "./ErrorComponent";
import Redirect from "./Redirect";

function SignIn() {
  const usernameEl = useRef();
  const passwordEl = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const { data: session } = useSession();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await signIn("credentials", {
        username: usernameEl.current.value,
        password: passwordEl.current.value,
        redirect: false,
      });
      if (!response || !response.ok) {
        throw new Error("Wrong username or password!");
      }
      setDone(true);
      setError(null);
    } catch (err) {
      setDone(false);
      setError(err.message);
    }
  };

  return (
    <>
      <ErrorComponent error={error} onResolve={setError.bind(this, null)} />
      <Redirect route={"/admin"} show={done || session} text={"Directing to dashboard..."} title={"Signed In"} />
      <form onSubmit={submitHandler}>
        <div className="shadow-md grid gap-5 mx-auto mt-[5%] w-[500px] px-4 py-2 rounded-lg shadow-teal-900">
          <div className="grid gap-1">
            <label htmlFor="userName">Username:</label>
            <input
              ref={usernameEl}
              id="userName"
              name="userName"
              type="text"
              className="border-2 border-solid border-teal-800 rounded-[4px] outline-0 focus:border-teal-600 px-2 py-1 font-[inherit]"
            />
          </div>
          <div className="grid gap-1 relative">
            <label htmlFor="password">Password:</label>
            <input
              ref={passwordEl}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="border-2 border-solid border-teal-800 rounded-[4px] outline-0 focus:border-teal-600 px-2 py-1 font-[inherit] pr-7"
            />
            <button
              className="absolute bottom-[6px] right-[6px] text-teal-800"
              onClick={setShowPassword.bind(this, (prev) => {
                return !prev;
              })}
            >
              <Icon path={showPassword ? mdiEyeOff : mdiEye} size={1} />
            </button>
          </div>
          <button type="submit" className="bg-teal-800 text-white py-3 mt-6 hover:bg-teal-700 active:bg-teal-600">
            Sign In
          </button>
        </div>
      </form>
    </>
  );
}

export default SignIn;

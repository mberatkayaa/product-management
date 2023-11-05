"use client";

import { signOut } from "next-auth/react";

function HookInvoker({ response }) {
  if (response.body.signOut) signOut();
  return <></>;
}

export default HookInvoker;

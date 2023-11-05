"use client";

import { signOut } from "next-auth/react";

function SignoutButton({ className, children }) {
  signOut;
  return (
    <button className={className} onClick={() => signOut()}>
      {children || "Sign out"}
    </button>
  );
}

export default SignoutButton;

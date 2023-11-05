import { getServerSession } from "next-auth";

import Sidebar from "@/components/Sidebar";
import Redirect from "@/components/Redirect";
import SignoutButton from "@/components/SignoutButton";

import { authOptions } from "../api/auth/[...nextauth]/route";

async function Layout({ children }) {
  const session = await getServerSession(authOptions);
  if (session) {
    return (
      <div className="grid grid-cols-12 content-start xl:content-normal h-screen w-screen overflow-hidden">
        <SignoutButton className="fixed top-3 right-3 px-3 py-2 bg-white border-2 rounded-md border-teal-800 hover:bg-teal-800 hover:text-white active:bg-teal-600 active:border-teal-600 active:text-white" />
        <Sidebar className="overflow-y-auto" />
        <main className="col-span-12 xl:col-span-9 h-full overflow-y-auto p-6">{children}</main>
      </div>
    );
  } else {
    return <Redirect show={true} route={"/"} text={"Redirecting to sign in..."} title={"Not allowed!"} />;
  }
}

export default Layout;

"use client";
import { useState } from "react";

import Link from "next/link";

import Icon from "@mdi/react";
import { mdiMenu, mdiCube, mdiSwapHorizontal } from "@mdi/js";

import clsx from "clsx";

function Sidebar({ className }) {
  const [showMenu, setShowMenu] = useState(false);

  const asideContent = (
    <>
      <h1 className="text-teal-800 text-4xl p-3 mt-3 hidden xl:block">Dashboard</h1>
      <Link
        href={"/admin/products"}
        className={"flex items-center gap-2 text-2xl bg-teal-800 text-white hover:bg-teal-700 active:bg-teal-600 px-3 py-2"}
      >
        <Icon path={mdiCube} size={1.25} />
        <span>Products</span>
      </Link>
      <Link
        href={"/admin/movements"}
        className={"flex items-center gap-2 text-2xl bg-teal-800 text-white hover:bg-teal-700 active:bg-teal-600 px-3 py-2"}
      >
        <div className="relative w-[1.875rem] h-[1.875rem]">
          <Icon path={mdiSwapHorizontal} size={0.75} className="absolute bottom-0 bg-white text-teal-800 rounded-full" />
          <Icon path={mdiCube} size={1.1} className="mx-auto" />
        </div>
        <span>Movements</span>
      </Link>
    </>
  );

  return (
    <>
      <header className="xl:hidden bg-emerald-400 col-span-12 grid grid-cols-12">
        <button
          className="col-span-1"
          onClick={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <Icon path={mdiMenu} size={1.5} className="mx-auto" />
        </button>
        <h1 className="text-teal-800 text-4xl p-3 text-center col-span-10">Dashboard</h1>
      </header>
      {showMenu && (
        <button
          className="absolute bg-opacity-75 bg-black h-[calc(100vh-4rem)] w-screen top-[4rem] xl:hidden"
          onClick={() => setShowMenu(false)}
        />
      )}
      <aside
        className={clsx(
          className,
          "absolute left-0 top-[4rem] h-[calc(100vh-4rem)] w-[min(350px,80%)] xl:hidden flex-col items-stretch gap-4 bg-emerald-400",
          {
            hidden: !showMenu,
            flex: showMenu,
          }
        )}
      >
        {asideContent}
      </aside>
      <aside className={clsx(className, "hidden xl:col-span-3 xl:flex h-full flex-col items-stretch gap-4 bg-emerald-400")}>
        {asideContent}
      </aside>
    </>
  );
}

export default Sidebar;

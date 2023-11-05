"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Swal from "react-sweetalert2";

function Redirect({ show, title, text, route }) {
  const [act, setAct] = useState(false);
  useEffect(() => {
    let timeoutId;
    if (act) {
      timeoutId = setTimeout(() => {
        router.push(route);
        router.refresh();
      }, 250);
    }
    return () => {
      if (act && timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [act]);
  const router = useRouter();
  return (
    <>
      {show && !act && (
        <Swal
          title={title}
          text={text}
          timer={1500}
          timerProgressBar={true}
          show={true}
          onResolve={() => {
            setAct(true);
          }}
        />
      )}
    </>
  );
}

export default Redirect;

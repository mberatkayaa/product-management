"use client";

import Swal from "react-sweetalert2";

function ErrorComponent({ error, title, onResolve }) {
  title = title || "Oops!";

  return <>{error && <Swal title={title} text={error} show={true} icon="error" onResolve={onResolve} />}</>;
}

export default ErrorComponent;

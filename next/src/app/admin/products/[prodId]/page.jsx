import Link from "next/link";

import Icon from "@mdi/react";
import { mdiCube, mdiCubeOff, mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";

import MovementCard from "@/components/MovementCard";
import DeleteButton from "@/components/DeleteButton";
import ErrorComponent from "@/components/ErrorComponent";

import { serverSideFetch } from "@/misc/fetchOperations";

async function ProductDetailsPage({ params }) {
  let productErrorMessage;
  let productError;
  let product;
  let movementsErrorMessage;
  let movementsError;
  let movements;

  let response = await serverSideFetch({ endPoint: `/admin/products/${params.prodId}` });
  productError = response.error;
  product = response.body;

  if (!productError && product) {
    response = await serverSideFetch({ endPoint: `/admin/products/${params.prodId}/movements` });
    movementsError = response.error;
    movements = response.body;
  }

  if (productError) {
    return <ErrorComponent error={productErrorMessage} title={"Error"} />;
  }
  return (
    <>
      <div className="flex flex-col items-start gap-3 p-4 rounded-md shadow-md shadow-black">
        <h1 className="text-4xl font-bold border-b-2 border-teal-700 border-opacity-75"># {product.code}</h1>
        <div className="flex gap-2">
          <Link
            className="flex gap-1 justify-center items-center text-lg px-3 py-2 border-2 rounded-md bg-cyan-800 text-white hover:bg-cyan-700 active:bg-cyan-600"
            href={`/admin/products/edit/${params.prodId}`}
          >
            <Icon path={mdiPencil} size={1} />
            <span>Edit</span>
          </Link>
          <DeleteButton
            cancelText={"Cancel"}
            confirmText={"Confirm"}
            endPoint={`/api/products/delete?_id=${params.prodId}`}
            icon={"question"}
            method={"DELETE"}
            redirect={"/admin/products"}
            text={"Are you sure you want to permanently delete this product with associated movements?"}
            title={"Delete Product"}
            className="flex gap-1 justify-center items-center text-lg px-3 py-2 border-2 rounded-md bg-red-800 text-white hover:bg-red-700 active:bg-red-600"
          >
            <Icon path={mdiDelete} size={1} />
            <span>Delete</span>
          </DeleteButton>
        </div>
        <span className="text-justify p-2 shadow shadow-black rounded-md">{product.description}</span>
        <span className="flex gap-1 p-2 shadow shadow-black rounded-md">
          <span className="mr-2">Stock:</span>
          <Icon path={product.stock <= 0 ? mdiCubeOff : mdiCube} size={1} />
          <span>{product.stock}</span>
        </span>
      </div>
      <div className="p-4 mt-5 rounded-md shadow-md shadow-black">
        <div className="flex items-center gap-4 text-4xl mb-3">
          <h1>Movements</h1>
          <Link
            href={`/admin/movements/add?prodId=${product._id}&prodCode=${product.code}&redirect=${`/admin/products/${params.prodId}`}`}
            title="Create New Product"
            className="bg-teal-800 hover:bg-teal-700 active:bg-teal-600 text-white rounded-full"
          >
            <Icon path={mdiPlus} size={1.5} />
          </Link>
        </div>
        {(!movements || movements.length === 0) && <span>No movements registered to the product...</span>}
        {movementsError && <ErrorComponent error={movementsErrorMessage} title={"Error"}/>}
        {movements && movements.length > 0 && movements.map((x) => <MovementCard key={x._id} movement={x} />)}
      </div>
    </>
  );
}

export default ProductDetailsPage;

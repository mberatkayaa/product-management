import ErrorComponent from "@/components/ErrorComponent";
import ProductForm from "@/components/ProductForm";

import { serverSideFetch } from "@/misc/fetchOperations";

async function EditProductPage({ params }) {
  const response = await serverSideFetch({ endPoint: `/admin/products/${params.prodId}` });
  const { error, message, body: product } = response;

  return (
    <>
      {error && <ErrorComponent error={message} title={"Error"} />}
      {product && <ProductForm initialValue={product} redirect={`/admin/products/${params.prodId}`} />}
    </>
  );
}

export default EditProductPage;

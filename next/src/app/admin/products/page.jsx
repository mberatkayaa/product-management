import Link from "next/link";

import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";

import ProductCard from "@/components/ProductCard";
import ErrorComponent from "@/components/ErrorComponent";

import { serverSideFetch } from "@/misc/fetchOperations";

async function ProductsPage() {
  const response = await serverSideFetch({ endPoint: "/admin/products" });
  const { error, message, body: products } = response;
  return (
    <>
      {error && <ErrorComponent error={message} title={"Error"} />}
      <div className="flex items-center gap-4 text-4xl mb-10">
        <h1>Products</h1>
        <Link
          href={"/admin/products/add"}
          title="Create New Product"
          className="bg-teal-800 hover:bg-teal-700 active:bg-teal-600 text-white rounded-full"
        >
          <Icon path={mdiPlus} size={1.5} />
        </Link>
      </div>
      {products && products.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
          {products.map((x) => (
            <Link key={x._id} href={`/admin/products/${x._id}`}>
              <ProductCard product={x} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

export default ProductsPage;

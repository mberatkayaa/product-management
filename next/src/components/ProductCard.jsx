"use server"
import Icon from "@mdi/react";
import { mdiCube, mdiCubeOff } from "@mdi/js";

function ProductCard({ product }) {
  return (
    <div className="shadow-lg p-3 h-full">
      <span className="flex font-semibold text-lg border-b-2 border-teal-700 border-opacity-75" title={product.code}>
        <span className="truncate"># {product.code}</span>
        <span className="flex gap-1 ml-auto">
          <Icon path={product.stock <= 0 ? mdiCubeOff : mdiCube} size={1} />
          <span>{product.stock > 999 ? "999+" : product.stock}</span>
        </span>
      </span>
      <span className="block text-base text-justify max-h-[7.5rem] overflow-hidden">
        {product.description.length > 128 ? product.description.slice(0, 125) + "..." : product.description}
      </span>
    </div>
  );
}

export default ProductCard;

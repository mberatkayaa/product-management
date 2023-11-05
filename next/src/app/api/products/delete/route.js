import { revalidatePath } from "next/cache";

import { serverSideFetch } from "@/misc/fetchOperations";

export async function DELETE(request) {
  const _id = request.nextUrl.searchParams.get("_id");
  const result = await serverSideFetch({ endPoint: `/admin/products/delete/${_id}`, method: "DELETE" });

  if (result.ok) {
    revalidatePath("/admin/products", "page");
    revalidatePath(`/admin/products/${_id}`, "page");
    revalidatePath("/admin/movements", "page");
    return Response.json(result);
  }
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
    status: 404,
  });
}

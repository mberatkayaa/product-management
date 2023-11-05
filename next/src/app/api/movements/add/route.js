import { revalidatePath } from "next/cache";

import { serverSideFetch } from "@/misc/fetchOperations";

export async function POST(request, response) {
  const buffer = await request.json();
  const prodId = buffer.prodId;
  buffer.prod = { prodId, prodCode: buffer.prodCode };
  delete buffer.prodId;
  delete buffer.prodCode;

  const body = JSON.stringify(buffer);
  const result = await serverSideFetch({ endPoint: "/admin/movements/add", method: "POST", body });

  if (result.ok) {
    revalidatePath("/admin/products", "page");
    revalidatePath("/admin/movements", "page");
    revalidatePath(`/admin/products/${prodId}`, "page");
    return Response.json(result);
  }
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
    status: 404,
  });
}

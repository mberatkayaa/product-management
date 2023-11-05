import { revalidatePath } from "next/cache";

import { serverSideFetch } from "@/misc/fetchOperations";

export async function POST(request, response) {
  const body = JSON.stringify(await request.json());
  const result = await serverSideFetch({ endPoint: "/admin/products/add", method: "POST", body });

  if (result.ok) {
    revalidatePath("/admin/products", "page");
    return Response.json(result);
  }
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
    status: 404,
  });
}

import Form from "./Form";

function ProductForm({ initialValue, redirect }) {
  let edit = false;
  if (initialValue) {
    edit = true;
  }
  initialValue = initialValue || { code: "", description: "", stock: "" };
  redirect = redirect || "/admin/products";
  const endPoint = `/api/products/${edit ? `edit?_id=${initialValue._id}` : "add"}`;
  const method = edit ? "PATCH" : "POST";
  return (
    <Form endPoint={endPoint} method={method} redirect={redirect}>
      <h1 className="text-3xl mb-6">{edit ? "Edit" : "Create"} Product</h1>
      {edit && <input type="hidden" id="_id" name="_id" value={initialValue._id} />}
      <div className="grid gap-1 mb-4">
        <label htmlFor="code" className="font-bold text-xl">
          Code
        </label>
        <input
          id="code"
          name="code"
          type="text"
          required
          defaultValue={initialValue.code}
          className="border-2 border-solid border-teal-800 rounded-[4px] outline-0 focus:border-teal-600 px-2 py-1 font-[inherit]"
        />
      </div>
      <div className="grid gap-1 mb-4">
        <label htmlFor="description" className="font-bold text-xl">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          required
          defaultValue={initialValue.description}
          className="border-2 border-solid border-teal-800 rounded-[4px] outline-0 focus:border-teal-600 px-2 py-1 font-[inherit]"
        />
      </div>
      <div className="grid gap-1 mb-4">
        <label htmlFor="stock" className="font-bold text-xl">
          Stock
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          min={"0"}
          required
          defaultValue={initialValue.stock}
          className="border-2 border-solid border-teal-800 rounded-[4px] outline-0 focus:border-teal-600 px-2 py-1 font-[inherit]"
        />
      </div>
      <button type="submit" className="bg-teal-800 text-white py-3 mt-6 hover:bg-teal-700 active:bg-teal-600 w-full">
        Save
      </button>
    </Form>
  );
}

export default ProductForm;

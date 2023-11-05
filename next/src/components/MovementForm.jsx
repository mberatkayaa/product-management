import Form from "./Form";

function MovementForm({ prodId, prodCode, redirect }) {
  const endPoint = "/api/movements/add";
  const method = "POST";
  redirect = redirect || "/admin/movements";
  return (
    <Form endPoint={endPoint} method={method} redirect={redirect}>
      <h1 className="text-3xl mb-6">{prodCode}</h1>
      <h1 className="text-3xl mb-6">Create Movement</h1>
      <input type="hidden" id="prodId" name="prodId" value={prodId} />
      <input type="hidden" id="prodCode" name="prodCode" value={prodCode} />
      <div className="grid gap-1 mb-4">
        <label htmlFor="description" className="font-bold text-xl">
          Description
        </label>
        <input
          id="description"
          name="description"
          type="text"
          required
          className="border-2 border-solid border-teal-800 rounded-[4px] outline-0 focus:border-teal-600 px-2 py-1 font-[inherit]"
        />
      </div>
      <div className="grid gap-1 mb-4">
        <label htmlFor="stock" className="font-bold text-xl">
          Stock
        </label>
        <input
          id="numberOfIO"
          name="numberOfIO"
          type="number"
          required
          className="border-2 border-solid border-teal-800 rounded-[4px] outline-0 focus:border-teal-600 px-2 py-1 font-[inherit]"
        />
      </div>
      <button type="submit" className="bg-teal-800 text-white py-3 mt-6 hover:bg-teal-700 active:bg-teal-600 w-full">
        Save
      </button>
    </Form>
  );
}

export default MovementForm;

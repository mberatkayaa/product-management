import MovementForm from "@/components/MovementForm";

function CreateMovementPage({ searchParams }) {
  const redirect = searchParams.redirect;
  const prodId = searchParams.prodId;
  const prodCode = searchParams.prodCode;
  if (!prodId) {
    return <span>Product id is missing... Please visit detailed product page to add movement.</span>;
  }
  return <MovementForm prodCode={prodCode} prodId={prodId} redirect={redirect}/>;
}

export default CreateMovementPage;

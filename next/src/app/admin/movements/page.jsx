import ErrorComponent from "@/components/ErrorComponent";
import MovementCard from "@/components/MovementCard";

import { serverSideFetch } from "@/misc/fetchOperations";

async function MovementsPage() {
  const response = await serverSideFetch({ endPoint: "/admin/movements" });
  const { error, message, body: movements } = response;

  return (
    <>
      <div className="flex items-center gap-4 text-4xl mb-10">
        <h1>Movements</h1>
      </div>
      {error && <ErrorComponent error={message} title={"Error"} />}
      {movements && movements.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
          {movements.map((x) => (
            <MovementCard key={x._id} movement={x} />
          ))}
        </div>
      )}
    </>
  );
}

export default MovementsPage;

"use server"
import Icon from "@mdi/react";
import { mdiCube, mdiSwapHorizontal } from "@mdi/js";

function MovementCard({ movement }) {
  return (
    <div className="shadow-lg p-3 h-full">
      <span className="flex font-semibold text-lg border-b-2 border-teal-700 border-opacity-75" title={movement.prod.code}>
        <span className="truncate"># {movement.prod.prodCode}</span>
        <span className="flex gap-1 ml-auto">
        <div className="relative w-[1.875rem] h-[1.875rem]">
          <Icon path={mdiSwapHorizontal} size={0.75} className="absolute bottom-0 bg-white text-teal-800 rounded-full" />
          <Icon path={mdiCube} size={1.1} className="mx-auto" />
        </div>
          <span>{movement.numberOfIO}</span>
        </span>
      </span>
      <span className="block text-base text-justify max-h-[7.5rem] overflow-hidden">
        {movement.description.length > 128 ? movement.description.slice(0, 125) + "..." : movement.description}
      </span>
    </div>
  );
}

export default MovementCard;

"use client";

import EnterShortcut from "./EnterShortcut";
import { Card } from "./ui/card";
import Time from "./Time";
import { useSelector } from "@/state-machine/provider";

export function Stepper() {
  const shifts = useSelector((state) => state.context.shifts);
  return (
    <div className="relative m-auto my-5 h-fit max-h-114 sm:w-11/12 md:w-3/5 lg:w-2/5">
      {shifts.map(({ type }, index) => (
        <div className="my-5 flex w-full flex-col gap-y-8" key={index}>
          <Card id={"Here"} index={0} totalCards={1} key={"Here"}>
            <Time label={type.toString()} type={type} />
          </Card>
          <EnterShortcut shortCut={() => {}} text={"to add breaks"} />
        </div>
      ))}
    </div>
  );
}

"use client";

import EnterShortcut from "@/components/EnterShortcut";
import { Card } from "@/components/ui/card";
import Time from "@/components/Time";
import { useStateStore } from "@/state/provider";
import { Steps } from "@/state/store";
import Result from "@/components/Result";
import { useRef } from "react";

export function Stack() {
  const shifts = useStateStore((state) => state.shifts);
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <div className="relative m-auto my-5 h-fit max-h-114 sm:w-11/12 md:w-3/5 lg:w-2/5">
      {shifts.length === 0 && (
        <div className="my-5 flex w-full flex-col gap-y-8">
          <Card id={Steps.HERE} index={0} totalCards={1} key={Steps.HERE}>
            <Time type={Steps.HERE} ref={ref} />
          </Card>
        </div>
      )}
      {shifts.at(-1)?.step === Steps.LEAVING ? (
        <Card
          id={"result"}
          index={shifts.length - 1}
          totalCards={shifts.length}
          key={"result"}
        >
          <Result />
        </Card>
      ) : (
        shifts.map(({ step }, index) => {
          // FIXME: get `leaving` boolean
          const type = getStepType(step, true);
          return (
            <div className="my-5 flex w-full flex-col gap-y-8" key={index}>
              <Card
                id={Steps[type]}
                index={index}
                totalCards={shifts.length}
                key={Steps[type]}
              >
                <Time type={type} ref={ref} />
              </Card>
            </div>
          );
        })
      )}
      {shifts.at(-1)?.step !== Steps.LEAVING && (
        <EnterShortcut
          text={"to submit entries"}
          shortCut={() => {
            ref.current?.click();
          }}
        />
      )}
    </div>
  );
}
// This represents logic to render the steps
const getStepType = (type: Steps, leaving: boolean = false) => {
  switch (type) {
    case Steps.HERE:
      return Steps.AWAY;
    case Steps.AWAY:
      return Steps.BACK;
    case Steps.BACK:
      return leaving ? Steps.LEAVING : Steps.AWAY;
    default:
      return Steps.HERE;
  }
};

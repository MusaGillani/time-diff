"use client";

import EnterShortcut from "@/components/EnterShortcut";
import { Card } from "@/components/ui/card";
import Time from "@/components/Time";
import { useStateStore } from "@/state/provider";
import { Steps } from "@/state/store";
import Result from "@/components/Result";
import { useRef } from "react";
import { SubmitRef } from "@/components/Time";

const STACK_ID = "stack-comp";
export function Stack() {
  const shifts = useStateStore((state) => state.shifts);
  const ref = useRef<SubmitRef | null>(null);

  return (
    <div
      className="relative m-auto my-5 h-fit max-h-114 sm:w-11/12 md:w-3/5 lg:w-2/5"
      id={STACK_ID}
    >
      <Card
        id={Steps.HERE}
        index={0}
        totalCards={shifts.length + 1}
        key={Steps.HERE}
      >
        <Time type={Steps.HERE} ref={ref} />
      </Card>
      {shifts.at(-1)?.step === Steps.LEAVING ? (
        <Card
          id={"result"}
          index={shifts.length}
          totalCards={shifts.length + 1}
          key={"result"}
        >
          <Result />
        </Card>
      ) : (
        shifts.map(({ step, leaving }, index) => {
          const type = getStepType(step, leaving);
          return (
            <>
              <Card
                id={Steps[type]}
                index={index + 1}
                totalCards={shifts.length + 1}
                key={Steps[type]}
              >
                <Time type={type} ref={ref} />
              </Card>
              {type === Steps.BACK && (
                <EnterShortcut
                  text={"to submit entries"}
                  shortCut={() => {
                    // FIXME: this ref is null
                    ref.current!();
                  }}
                />
              )}
            </>
          );
        })
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

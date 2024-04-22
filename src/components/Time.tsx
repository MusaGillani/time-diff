import { Label } from "./ui/label";
import { Input } from "./ui/input";
import dynamic from "next/dynamic";
import { useState } from "react";
import { TimeSchema } from "@/lib/form";
import { Button } from "./ui/button";
import { useActorRef } from "@/state-machine/provider";
import { Events } from "@/state-machine/events";
import { Steps } from "@/state-machine/machine";

export interface TimeProps {
  label: string;
  type: string;
}

function Time({ label, type }: TimeProps) {
  const actor = useActorRef();
  const [timeVal, setTime] = useState<TimeSchema>({
    hour: undefined,
    minute: undefined,
  });
  return (
    <div className="flex h-full flex-col justify-between gap-y-3 rounded-lg border-2 border-slate-300 p-5">
      <div>
        <Label className="text-2xl">{label}</Label>
        <div className="flex gap-x-5 ">
          <Input
            placeholder="hour"
            value={timeVal.hour}
            onChange={(e) =>
              setTime((prev) => ({ ...prev, hour: e.target.value }))
            }
          />
          <Input
            placeholder="minutes"
            value={timeVal.minute}
            onChange={(e) =>
              setTime((prev) => ({ ...prev, minute: e.target.value }))
            }
          />
        </div>
      </div>
      <Button
        type="button"
        onClick={() => {
          actor.send({ type: getEvent(type), data: { time: timeVal, type } });
        }}
      >
        Next
      </Button>
    </div>
  );
}

export default Time;

export const TimeNoSSR = dynamic(() => Promise.resolve(Time), {
  ssr: false,
});

const getEvent = (type: Steps[number]) => {
  switch (type) {
    case "Here":
      return Events.SubmitHere;

    case "Away":
      return Events.SubmitAway;

    case "Back":
      return Events.SubmitBack;

    case "Leaving":
      return Events.SubmitLeaving;

    default:
      return Events.SubmitResult;
  }
};

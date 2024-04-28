import { Label } from "./ui/label";
import { Input } from "./ui/input";
import dynamic from "next/dynamic";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { TimeSchema, timeSchema } from "@/lib/form";
import { Button } from "./ui/button";
import { useStateStore } from "@/state/provider";
import { Steps } from "@/state/store";
//FIXME this is now a local pkg, figure out a way to fix build error in vercel....
import { toast } from "sonner";
import { useEnter } from "@/hooks/useEnter";

export interface TimeProps {
  type: Steps;
}

export type SubmitRef = (leaving?: boolean) => void;

export const Time = forwardRef<SubmitRef | null, TimeProps>(({ type }, ref) => {
  const [timeVal, setTime] = useState<TimeSchema>({
    hour: "",
    minute: "",
  });

  const save = useStateStore(({ save }) => save);

  useImperativeHandle(ref, () => {
    return (leaving) => submit(timeVal, leaving);
  });

  // useEnter(() => submit(timeVal));

  const label = Steps[type].at(0) + Steps[type].substring(1).toLowerCase();
  const submit = (data: TimeSchema, leaving = false) => {
    const result = timeSchema.safeParse(data);
    if (!result.success) {
      const errors = Object.entries(result.error.formErrors.fieldErrors).map(
        ([field, error]) => `${field}: ${error}`,
      );
      toast.error(label, {
        position: "bottom-right",
        description: (
          <div>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        ),
      });
      return;
    }
    save({ time: data, step: type, leaving });
  };

  return (
    <div className="flex h-full flex-col justify-between gap-y-3 rounded-lg border-2 border-slate-300 p-5">
      <Label className="text-center text-2xl">{label}</Label>

      <div className="flex gap-2">
        <Input
          placeholder="hour"
          value={timeVal.hour}
          type="number"
          onChange={(e) => {
            setTime((prev) => ({ ...prev, hour: e.target.value }));
          }}
        />
        <Input
          placeholder="minutes"
          value={timeVal.minute}
          type="number"
          onChange={(e) => {
            setTime((prev) => ({ ...prev, minute: e.target.value }));
          }}
        />
      </div>
      <Button type="button" onClick={() => submit(timeVal)}>
        Next
      </Button>
    </div>
  );
});

Time.displayName = "Time";
export default Time;

export const TimeNoSSR = dynamic(() => Promise.resolve(Time), {
  ssr: false,
});

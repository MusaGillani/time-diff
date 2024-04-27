import { Label } from "./ui/label";
import { Input } from "./ui/input";
import dynamic from "next/dynamic";
import { forwardRef, useState } from "react";
import { TimeSchema, timeSchema } from "@/lib/form";
import { Button } from "./ui/button";
import { useStateStore } from "@/state/provider";
import { Steps } from "@/state/store";
import { toast } from "sonner";

export interface TimeProps {
  type: Steps;
}

export const Time = forwardRef<HTMLButtonElement, TimeProps>(
  ({ type }, ref) => {
    const [timeVal, setTime] = useState<TimeSchema>({
      hour: "",
      minute: "",
    });

    const save = useStateStore(({ save }) => save);

    const submit = (data: TimeSchema) => {
      const result = timeSchema.safeParse(data);
      if (!result.success) {
        Object.entries(result.error.formErrors.fieldErrors).forEach(
          ([field, error]) => {
            toast.error(`${field}: ${error}`, {
              position: "bottom-right",
            });
          },
        );
        return;
      }
      save({ time: data, step: type });
    };

    const label = Steps[type].at(0) + Steps[type].substring(1).toLowerCase();

    return (
      <div className="flex h-full flex-col justify-between gap-y-3 rounded-lg border-2 border-slate-300 p-5">
        <Label className="text-center text-2xl">{label}</Label>
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
        {/* TODO: maybe refactor this ref to expose a ref for the `submit` function using `useImperativeHandle` */}
        <Button type="button" onClick={() => submit(timeVal)} ref={ref}>
          Next
        </Button>
      </div>
    );
  },
);

Time.displayName = "Time";
export default Time;

export const TimeNoSSR = dynamic(() => Promise.resolve(Time), {
  ssr: false,
});

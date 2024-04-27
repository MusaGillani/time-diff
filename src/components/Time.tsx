import { Label } from "./ui/label";
import { Input } from "./ui/input";
import dynamic from "next/dynamic";
import {
  MutableRefObject,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { TimeSchema, timeSchema } from "@/lib/form";
import { Button } from "./ui/button";
import { useStateStore } from "@/state/provider";
import { Steps } from "@/state/store";
import { toast } from "sonner";

export interface TimeProps {
  type: Steps;
  ref: MutableRefObject<SubmitRef | null>;
}

export type SubmitRef = (leaving?: boolean) => void;

export const Time = ({ type, ref }: TimeProps) => {
  const [timeVal, setTime] = useState<TimeSchema>({
    hour: "",
    minute: "",
  });

  const save = useStateStore(({ save }) => save);

  useImperativeHandle(ref, () => {
    return (leaving) => submit(timeVal, leaving);
  });

  const submit = (data: TimeSchema, leaving = false) => {
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
    save({ time: data, step: type, leaving });
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
      <Button type="button" onClick={() => submit(timeVal)}>
        Next
      </Button>
    </div>
  );
};

Time.displayName = "Time";
export default Time;

export const TimeNoSSR = dynamic(() => Promise.resolve(Time), {
  ssr: false,
});

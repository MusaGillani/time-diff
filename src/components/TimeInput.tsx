import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "./ui/form";
import { FieldPath, useFormContext } from "react-hook-form";
import { HereFormSchema } from "./HereForm";
import { LeavingFormSchema } from "./LeavingForm";
import { BreakFormSchema } from "./BreakForm";
import dynamic from "next/dynamic";

type Schema = HereFormSchema | LeavingFormSchema | BreakFormSchema;

export interface TimeInputProps {
  nameMinute: FieldPath<Schema>;
  nameHour: FieldPath<Schema>;
  label: string;
  timeLabels?: boolean;
}

function TimeInput({
  nameHour,
  nameMinute,
  label,
  timeLabels,
}: TimeInputProps) {
  const { control } = useFormContext<Schema>();

  return (
    <div>
      <Label className="text-2xl">{label}</Label>
      <div className="flex gap-x-5 ">
        <FormField
          control={control}
          name={nameHour}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{timeLabels && "Hour"}</FormLabel>
              <FormControl>
                {/* @ts-expect-error */}
                <Input {...field} placeholder="hour" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={nameMinute}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{timeLabels && "Minutes"}</FormLabel>
              <FormControl>
                {/* @ts-expect-error */}
                <Input {...field} placeholder="minutes" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default TimeInput;

export const TimeInputNoSSR = dynamic(() => Promise.resolve(TimeInput), {
  ssr: false,
});

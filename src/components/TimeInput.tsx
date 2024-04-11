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
import { FormSchema } from "./TimeForm";

export interface TimeInputProps {
  nameMinute: FieldPath<FormSchema>;
  nameHour: FieldPath<FormSchema>;
  label: string;
  timeLabels?: boolean;
}

export function TimeInput({
  nameHour,
  nameMinute,
  label,
  timeLabels,
}: TimeInputProps) {
  const { control } = useFormContext<FormSchema>();

  return (
    <>
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
    </>
  );
}

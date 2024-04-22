import { TimeSchema } from "@/lib/form";
import { Steps } from "./machine";

export type Context = {
  shifts: {
    time: TimeSchema;
    type: Steps[number];
  }[];
};

export const defaultContext: Context = {
  shifts: [
    {
      time: {
        hour: undefined,
        minute: undefined,
      },
      type: "Here",
    },
  ],
};

import { Guards } from "./lib";
import { Context } from "./context";
import { StepEvents } from "./events";

export const guards: Guards<Context, StepEvents> = {
  isLastEntryAway: ({ context }) => context,
};

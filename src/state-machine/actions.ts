import { assertEvent } from "xstate";
import { Events, StepEvents } from "./events";
import { Context } from "./context";
import { createAssign } from "./lib";
import { Actors } from "./actors";

const assign = createAssign<Context, StepEvents, Actors>();

export const actions = {
  submitHere: assign(({ event, context }) => {
    assertEvent(event, Events.SubmitHere);
    return context;
  }),
  submitAway: assign(({ event, context }) => {
    assertEvent(event, Events.SubmitAway);
    // const newCtx = [...context.shifts].push(event.data);
    // return { shifts: newCtx };
    return context;
  }),
  submitBack: assign(({ event, context }) => {
    assertEvent(event, Events.SubmitBack);
    return context;
  }),
  submitLeaving: assign(({ event, context }) => {
    assertEvent(event, Events.SubmitLeaving);
    return context;
  }),
};

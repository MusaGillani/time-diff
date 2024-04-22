import { ActorArgs } from "./lib";
import { fromPromise } from "xstate";
import { Context } from "./context";

export const actors = {
  complete: fromPromise(({ input }: ActorArgs<Context>) => {
    return Promise.resolve(input);
  }),
};

export type Actors = typeof actors;

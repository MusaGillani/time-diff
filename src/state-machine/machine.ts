import { setup, not } from "xstate";
import { StepEvents } from "./events";
import { Context, defaultContext } from "./context";
import { actions } from "./actions";
import { actors } from "./actors";
import { guards } from "./guards";

export enum Steps {
  HERE = "Here",
  AWAY = "Away",
  BACK = "Back",
  LEAVING = "Leaving",
  RESULT = "Result",
}

export const machine = setup({
  types: {
    context: {} as Context,
    events: {} as StepEvents,
  },
  actions,
  actors,
  guards,
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgAkwAnMAYlgFcAjVXAFxOyrAG0AGAXUSgADgHtYbXKPxCQAD0QBGACwA2EqtUBWVQCYtyxQA4tAdgDMqowBoQAT0RHFJXgE5zp5e9NG9ivQC+AbZoWHiEpACCAO7odnRMLOzosXZ8gkggYhKsUjKZCggq6po6+oYmFla2DkWmJbperka8Wm66Ro1BIRg4BMQkAEJYANYJzGwkjKPpstmS0rKFxRraegbGZpY29oi6prokimVqB+a65sq+3SChfRFDozRQogAyYOgAbgRQs5nzuUWBSUalWZQ2lW2NUQllMGiMnlcWnMSI2Whud3CA3eXx+4ySJAANh9vvhfgI5uIFvlQIVDIcUbxVOYdMpzMdlFpoQhYfDEcjUYZ0Td8KIIHBZJj+kRKTk8ktEABaVTc5UY3pY0gUaiy6kKhBso6NVwm5q6RTGPTKbmKXjKI6KY2dMymHTs9VhaUkGJxXWAmnyGG8ZzMx2qVpaZo6VymG0mjRszyqdy8Jm6JEe+4DYaYEZ++XAg26bm6XhGFyKUzGNRaSq6XSqTOakg40lQfNA2lBkPshsRqPJ2O7HmuXgkUxp5TKfanQLBW4ar0AJTg9EJrA7AcKtecylTwddbjUdu5jPHk+nSfquiCQSAA */
  initial: Steps.HERE,
  context: defaultContext,
  states: {
    [Steps.HERE]: {
      on: {
        "submit.here": {
          target: Steps.AWAY,
          actions: "submitHere",
        },
      },
    },
    [Steps.AWAY]: {
      on: {
        "submit.away": {
          actions: "submitAway",
          target: Steps.BACK,
        },
      },
    },
    [Steps.BACK]: {
      on: {
        "submit.back": {
          actions: "submitBack",
          target: Steps.AWAY,
        },
        goLeaving: {
          actions: "submitBack",
          target: Steps.LEAVING,
        },
      },
    },
    [Steps.LEAVING]: {
      on: {
        "submit.leaving": {
          actions: "submitLeaving",
          target: Steps.RESULT,
        },
      },
    },
    [Steps.RESULT]: {},
  },
});

import { TimeSchema } from "@/lib/form";
import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";

export enum Steps {
  HERE,
  AWAY,
  BACK,
  LEAVING,
}

export type State = {
  shifts: {
    step: Steps;
    leaving?: boolean;
    time: TimeSchema;
  }[];
};

export type StateSnapshot = State["shifts"][number];

export type Actions = {
  save: (data: StateSnapshot) => void;
};

export type Store = State & Actions;

export const defaultInitState: State = {
  shifts: [],
};

export const createStateStore = (initState: State = defaultInitState) => {
  return createStore<Store>()(
    immer((set) => ({
      ...initState,
      // actions
      save: (data) =>
        set((state) => {
          state.shifts.push(data);
        }),
    })),
  );
};

import { BreakFormSchema } from "@/components/BreakForm";
import { HereFormSchema } from "@/components/HereForm";
import { LeavingFormSchema } from "@/components/LeavingForm";
import { defaultBreakObj } from "@/lib/form";
import { createStore } from "zustand/vanilla";
import { immer } from "zustand/middleware/immer";

export enum Steps {
  HERE,
  BREAKS,
  LEAVING,
  RESULT,
}

export type State = HereFormSchema &
  BreakFormSchema &
  LeavingFormSchema & {
    step: Steps;
  };

export type Actions = {
  saveHere: (data: HereFormSchema) => void;
  saveBreaks: (data: BreakFormSchema) => void;
  saveLeaving: (data: LeavingFormSchema) => void;
};

export type Store = State & Actions;

export const defaultInitState: State = {
  step: Steps.HERE,
  here: { hour: 0, minute: 0 },
  breaks: [defaultBreakObj],
  leaving: { hour: 0, minute: 0 },
};

export const createStateStore = (initState: State = defaultInitState) => {
  return createStore<Store>()(
    immer((set) => ({
      ...initState,
      // actions
      saveHere: (data) =>
        set((state) => {
          state.here = data.here;
          state.step = Steps.BREAKS;
        }),
      saveBreaks: (data) =>
        set((state) => {
          state.breaks = data.breaks;
          state.step = Steps.LEAVING;
        }),
      saveLeaving: (data) =>
        set((state) => {
          state.leaving = data.leaving;
          state.step = Steps.RESULT;
        }),
    })),
  );
};

"use client";

import { createActorContextWithInspection } from "./lib";
import { PropsWithChildren } from "react";
import { StateValueFrom } from "xstate";
import { Context } from "./context";
import { machine } from "./machine";

const MachineContext = createActorContextWithInspection(machine);

export const useActorRef = MachineContext.useActorRef;
export const useSelector = MachineContext.useSelector;

export interface MachineProviderProps extends PropsWithChildren {
  initialState: StateValueFrom<typeof machine>;
  initialContext: Context;
}

export function MachineProvider({
  initialState,
  initialContext,
  children,
}: MachineProviderProps) {
  return (
    <MachineContext.Provider
      logic={machine.provide({})}
      options={{
        snapshot: machine.resolveState({
          value: initialState,
          context: initialContext,
        }),
      }}
    >
      {children}
    </MachineContext.Provider>
  );
}

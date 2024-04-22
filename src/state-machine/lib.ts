import {
  Invert,
  MachineContext,
  ParameterizedObject,
  AnyEventObject,
  IsNever,
  Values,
  assign,
  UnknownActorLogic,
  AnyActorLogic,
} from "xstate";
import { createActorContext } from "@xstate/react";
// @ts-ignore
import { GuardPredicate } from "xstate/dist/declarations/src/guards";
export type DefaultToUnknownActorLogic<
  TActors extends Record<string, UnknownActorLogic>,
> =
  IsNever<keyof TActors> extends true
    ? Record<string, UnknownActorLogic>
    : TActors;

export type ToProvidedActor<
  TChildrenMap extends Record<string, string>,
  TActors extends Record<Values<TChildrenMap>, UnknownActorLogic>,
  TResolvedActors extends Record<
    string,
    UnknownActorLogic
  > = DefaultToUnknownActorLogic<TActors>,
> = Values<{
  [K in keyof TResolvedActors & string]: {
    src: K;
    logic: TResolvedActors[K];
    id: IsNever<TChildrenMap> extends true
      ? string | undefined
      : K extends keyof Invert<TChildrenMap>
        ? Invert<TChildrenMap>[K] & string
        : string | undefined;
  };
}>;

export interface ActorArgs<TContext extends MachineContext> {
  input: TContext;
}

export function createAssign<
  TContext extends MachineContext,
  TEvents extends AnyEventObject,
  TActors extends Record<Values<Record<string, string>>, UnknownActorLogic>,
>() {
  return function <T = undefined>(
    ...args: Parameters<
      typeof assign<
        TContext,
        TEvents,
        T,
        TEvents,
        ToProvidedActor<Record<string, string>, TActors>
      >
    >
  ) {
    return assign<
      TContext,
      TEvents,
      T,
      TEvents,
      ToProvidedActor<Record<string, string>, TActors>
    >(...args);
  };
}
export type ToParameterizedObject<
  TParameterizedMap extends Record<
    string,
    ParameterizedObject["params"] | undefined
  >,
> = Values<{
  [K in keyof TParameterizedMap & string]: {
    type: K;
    params: TParameterizedMap[K];
  };
}>;

export type Guards<
  TContext extends MachineContext,
  TEvents extends AnyEventObject,
> = Record<
  string,
  GuardPredicate<
    TContext,
    TEvents,
    unknown,
    ToParameterizedObject<Record<string, unknown>>
  >
>;

export function createActorContextWithInspection<T extends AnyActorLogic>(
  logic: T,
) {
  return createActorContext(logic, {
    ...(process.env.NEXT_PUBLIC_ENABLE_DEV_TOOLS &&
    typeof window !== "undefined"
      ? {
          inspect: console.log,
        }
      : {}),
  });
}

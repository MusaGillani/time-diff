import { TimeSchema } from "@/lib/form";
import { Steps } from "./machine";

export enum Events {
  "SubmitHere" = "submit.here",
  "SubmitAway" = "submit.away",
  "SubmitBack" = "submit.back",
  "SubmitLeaving" = "submit.leaving",
  "SubmitResult" = "submit.result",
  "GoLeaving" = "goLeaving",
}

export type Data = {
  time: TimeSchema;
  type: Steps;
};

export interface HereEvent {
  type: Events.SubmitHere;
  data: Data;
}
export interface AwayEvent {
  type: Events.SubmitAway;
  data: Data;
}
export interface BackEvent {
  type: Events.SubmitBack;
  data: Data;
}
export interface LeavingEvent {
  type: Events.SubmitLeaving;
  data: Data;
}
export interface ResultEvent {
  type: Events.SubmitResult;
}
export interface GoLeavingEvent {
  type: Events.GoLeaving;
  data: Data;
}

export type StepEvents =
  | HereEvent
  | AwayEvent
  | BackEvent
  | LeavingEvent
  | ResultEvent;

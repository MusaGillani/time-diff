"use client";

import { useSelector } from "./provider";
import { Steps } from "./machine";
import HereForm from "@/components/HereForm";

export interface StepsProps {}

export const Stepper = ({}: StepsProps) => {
  const state = useSelector((state) => state);

  switch (true) {
    case state.matches(Steps.HERE):
      return <HereForm />;
    default:
      return <div />;
  }
};

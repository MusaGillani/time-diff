"use client";

import { useSelector } from "./provider";

export interface StepsProps {}

export const Stepper = ({}: StepsProps) => {
  const state = useSelector((state) => state);

  switch (true) {
    default:
      return <div />;
  }
};

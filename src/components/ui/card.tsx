"use client";
import React from "react";
import { motion } from "framer-motion";

export interface CardProps extends React.PropsWithChildren {
  id: any;
  index: number;
  totalCards: number;
  offset?: number;
  scaleFactor?: number;
}
export const Card = ({
  id,
  index,
  offset,
  scaleFactor,
  totalCards,
  children,
}: CardProps) => {
  const CARD_OFFSET = offset || 10;
  // * Scale is 1 for index + 1 === totalCards
  // * Scale decreases by scaleFactor (by default 0.06) when index decreases by 1
  // * in other words the scale will be - 0.06 for each decrease in index by 1
  const scaleCalculated = calcScale(index + 1, totalCards, scaleFactor);
  return (
    <motion.div
      key={id}
      className="absolute h-96 w-full rounded-3xl border border-neutral-200 bg-white p-4 shadow-xl shadow-black/[0.1] dark:border-white/[0.1]  dark:bg-black dark:shadow-white/[0.05]"
      style={{
        transformOrigin: "top center",
      }}
      animate={{
        top: index * CARD_OFFSET,
        scale: scaleCalculated,
        zIndex: totalCards + index, //  decrease z-index for the cards that are behind
      }}
    >
      {children}
    </motion.div>
  );
};

/// inverse of 1 - index * SCALE_FACTOR
function calcScale(point: number, x: number, scaleFactor?: number) {
  // using y = mx + b
  // m is SLOPE
  // b is Intercept

  const SLOPE = scaleFactor || 0.06;
  const Intercept = 1 - SLOPE * x;
  return SLOPE * point + Intercept;
}

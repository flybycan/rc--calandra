import { CoreTypes } from "@nativescript/core";

export const slideLeft = {
  duration: 300,
  translate: { x: -300, y: 0 },
  opacity: 0
};

export const slideRight = {
  duration: 300,
  translate: { x: 300, y: 0 },
  opacity: 0
};

export const resetPosition = {
  duration: 300,
  translate: { x: 0, y: 0 },
  opacity: 1
};
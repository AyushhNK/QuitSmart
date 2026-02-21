import slowDown from "express-slow-down";

export const apiThrottler = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 10, // allow 10 requests without delay
  delayMs: 500,   // add 500ms delay per request after the 10th
});
import { createContext } from "react";

export const CalcCtx = createContext({
  operandOne: null,
  operandTwo: null,
  buttonNumber: (val: string) => {},
  action: (val: string) => {},
  clear: () => {},
  equally: () => {},
  value: "0",
});

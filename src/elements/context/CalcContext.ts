import { createContext } from "react";

export const CalcCtx = createContext({
  clickBtnNumber: (val: string) => {},
  action: (val: string) => {},
  clickEqually: () => {},
  scoreboardInput: "0",
  isError: false,
  clear: () => {},
});

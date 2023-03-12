import { configureStore } from "@reduxjs/toolkit";

import appSlice from "../redux/appSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
export type { RootState };

type AppDispatch = typeof store.dispatch;
export type { AppDispatch };

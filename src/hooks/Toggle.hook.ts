import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";
import { setRuntime } from "../redux/appSlice";

export const useToggle = () => {
  const runtime = useSelector((state: RootState) => state.app.runtime);
  const dispatch = useDispatch<AppDispatch>();

  const trueRintime = useCallback(() => {
    dispatch(setRuntime(true));
  }, [dispatch]);
  const falseRintime = useCallback(() => {
    dispatch(setRuntime(false));
  }, [dispatch]);

  return { runtime, trueRintime, falseRintime };
};

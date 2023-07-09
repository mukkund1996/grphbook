import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store/store";

/**
 * Helper hooks to be used in the place of `useDispatch`.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Helper hooks to be used in the place of `useSelector`.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

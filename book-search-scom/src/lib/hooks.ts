import { AppDispatch, RootState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Custom hook to use the Redux dispatch function with proper TypeScript typing.
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook to access the Redux state with proper typing.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

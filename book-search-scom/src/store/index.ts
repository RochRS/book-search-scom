import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";

// Create the Redux store using Redux Toolkit's configureStore
const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

// Define RootState type as the return type of store.getState()
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type to use with useDispatch for type safety
export type AppDispatch = typeof store.dispatch;

export default store;

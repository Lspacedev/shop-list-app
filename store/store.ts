import { configureStore } from "@reduxjs/toolkit";
import listReducer from "@/reducers/listReducer";

const store = configureStore({
  reducer: {
    lists: listReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;

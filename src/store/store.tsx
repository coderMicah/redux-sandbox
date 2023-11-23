import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice.ts"
import usersReducer from "../features/users/usersSlice.ts"

export const store = configureStore({
  reducer: {
    posts:postReducer,
    users:usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
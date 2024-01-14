import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user'
import taskReducer from './task'
export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks:taskReducer
  },
});

import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/LoginSlice";
import articleReducer from "./slices/ArticleSlice";

export const store = configureStore({
  reducer: {
    login : loginReducer,
    articles : articleReducer,
  },
});

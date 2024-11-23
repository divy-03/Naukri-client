import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAPi } from "./apis/userApi";
import { userReducer } from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    [userAPi.reducerPath]: userAPi.reducer,
    [userReducer.name]: userReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAPi.middleware),
});

setupListeners(store.dispatch);

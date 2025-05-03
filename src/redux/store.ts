import { configureStore } from "@reduxjs/toolkit";
import webcamReducer from "./webcamSlice";
import detectionReducer from "./detectionSlice";

export const store = configureStore({
  reducer: {
    webcam: webcamReducer,
    detection: detectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

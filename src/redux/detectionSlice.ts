import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FaceDetection } from "face-api.js";

interface DetectionState {
  faces: FaceDetection[];
}

const initialState: DetectionState = {
  faces: [],
};

const detectionSlice = createSlice({
  name: "detection",
  initialState,
  reducers: {
    setFaces: (state, action: PayloadAction<FaceDetection[]>) => {
      state.faces = action.payload;
    },
  },
});

export const { setFaces } = detectionSlice.actions;
export default detectionSlice.reducer;

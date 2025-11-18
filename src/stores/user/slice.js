import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  role: "",
  name: "",
  email: "",
  bloodType: "",
  eligibilityStatus: "",
  points: 0,
  level: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload, // mergea todo lo que venga del mock o del backend
      };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

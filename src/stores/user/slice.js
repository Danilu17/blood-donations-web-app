import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  role: "",
  first_name: "",
  last_name: "",
  email: "",
  blood_type: "",
  donation_count: 0,
  is_active: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
        role: action.payload.role?.toLowerCase() ?? "",
      };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

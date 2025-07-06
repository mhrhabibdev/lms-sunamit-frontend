// src/redux/features/auth/authSlice.ts

import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

interface AuthState {
  token: string;
  user: IUser | null; // Use IUser instead of any
}

const initialState: AuthState = {
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action) => {
      state.token = action.payload.token;
    },
    userLogin: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLogout: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

export const { userRegistration, userLogin, userLogout } = authSlice.actions;
export default authSlice.reducer;

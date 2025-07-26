// src/redux/features/auth/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  token: string;
  user: IUser | null;
}

const initialState: AuthState = {
  token: "",
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ After registration: store activation token only
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },

    // ✅ After login (manual or social): store token and user
    userLogin: (
      state,
      action: PayloadAction<{ token: string; user: IUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    // ✅ After social login: store token and user
    userSocialLogin: ( 
      state,
      action: PayloadAction<{ token: string; user: IUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    
    // ✅ Logout: clear all auth state
    userLogout: (state) => {
      state.token = "";
      state.user = null;
    },

    // ✅ Update only user data (e.g. name, avatar) without token change
    updateUserData: (state, action: PayloadAction<IUser>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  userRegistration,
  userLogin,
  userLogout,
  updateUserData,
  userSocialLogin
} = authSlice.actions;

export default authSlice.reducer;

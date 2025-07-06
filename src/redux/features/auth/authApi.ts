// src/redux/features/auth/authApi.ts

import { apiSlice } from "../api/apiSlice";
import { userLogin, userRegistration } from "./authSlice";

type User = {
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
};

type UserRegistrationResponse = {
  token: string;
  activationToken: string;
  user: User; 
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation<UserRegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.error("Registration failed:", error);
        }
      },
    }),

    activation: builder.mutation<
      UserRegistrationResponse,
      { activation_token: string; activation_code: string }
    >({
      query: ({ activation_token, activation_code }) => ({
        url: "activate-user",
        method: "POST",
        body: { activation_token, activation_code },
      }),
    }),

    login: builder.mutation<UserRegistrationResponse, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLogin({
              token: result.data.activationToken,
              user: result.data.user, 
            })
          );
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
    }),
  }),
});

export const { useUserRegisterMutation, useActivationMutation, useLoginMutation } = authApi;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import {
  userLogin,
  userLogout,
  userRegistration,
  userSocialLogin,
 
} from "./authSlice";
import { toast } from "sonner";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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

type LoginData = {
  email: string;
  password: string;
};

type SocialLoginBody = {
  email: string;
  name: string;
  avatar?: string;
};

type SocialLoginResponse = {
  token: string;
  user: User;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation<UserRegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
          toast.success("Registration successful!");
        } catch (error: any) {
          console.error("Registration failed:", error);
          toast.error(error?.data?.message || "Registration failed!");
        }
      },
    }),

    login: builder.mutation<UserRegistrationResponse, LoginData>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
        credentials: "include",
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
        } catch (error: any) {
          // console.error('Login failed:', error);
          toast.error(error?.data?.message || "Login failed!");
        }
      },
    }),

    socialLogin: builder.mutation<SocialLoginResponse, SocialLoginBody>({
      query: (data) => ({
        url: "social-auth",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userSocialLogin({
              token: result.data.token,
              user: result.data.user,
            })
          );
          toast.success("Social login successful!");
        } catch (error: any) {
          console.error("Social login failed:", error);
          toast.error(error?.data?.message || "Social login failed!");
        }
      },
    }),
    userLogout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLogout());
          toast.success("Logout successful!");
        } catch (error: any) {
          console.error("Logout failed:", error);
          toast.error(error?.data?.message || "Logout failed!");
        }
      },
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useLoginMutation,
  useSocialLoginMutation,
  useUserLogoutMutation,
} = authApi;

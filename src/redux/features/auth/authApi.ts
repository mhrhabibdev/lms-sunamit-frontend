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

type LoginResponse = {
  token: string;
  user: User;
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

type ActivationResponse = {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
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
          toast.success("Registration successful! Please check your email to activate your account.");
        } catch (error: any) {
          console.error("Registration failed:", error);
          toast.error(error?.data?.message || "Registration failed!");
        }
      },
    }),

    activation: builder.mutation<ActivationResponse, { activation_token: string; activation_code: string }>({
      query: (data) => ({
        url: "activate-user",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.message || "Account activated successfully!");
          
          if (data.token && data.user) {
            dispatch(
              userLogin({
                token: data.token,
                user: data.user,
              })
            );
          }
        } catch (error: any) {
          console.error("Activation failed:", error);
          toast.error(error?.data?.message || "Activation failed!");
        }
      },
    }),

    login: builder.mutation<LoginResponse, LoginData>({
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
              token: result.data.token,
              user: result.data.user,
            })
          );
          toast.success("Login successful!");
        } catch (error: any) {
          console.error('Login failed:', error);
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
  useActivationMutation,
  useLoginMutation,
  useSocialLoginMutation,
  useUserLogoutMutation,
} = authApi;
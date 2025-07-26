import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      // 👇 File-only input, FormData handled inside
      query: (file: File) => {
        const formData = new FormData();
        formData.append("avatar", file);

        return {
          url: "update-user-avatar",
          method: "PUT",
          body: formData,
          credentials: "include" as const,
          headers: {
            Accept: "application/json",
          },
        };
      },
    }),
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "update-user-info",
        method: "PUT",
        body: data,
        credentials: "include" as const,
        headers: {
          Accept: "application/json",
        },
      }),
    }),
    getUserMe: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
        headers: {
          Accept: "application/json",
        },
      }),
    }),
    updatePassword: builder.mutation({
      query: ({oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include" as const,
        headers: {
          Accept: "application/json",
        },
      }),

  }),
}),

  });

export const { useUpdateAvatarMutation, useUpdateUserInfoMutation,useGetUserMeQuery,useUpdatePasswordMutation } = userApi;

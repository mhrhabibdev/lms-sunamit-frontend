/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../store';
import { userLogin } from '../auth/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      // Redux store থেকে token নাও
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include', // যদি cookie-based auth থাকে
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: 'refresh',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
     loadUser: builder.query({
      query: () => ({
        url: 'me',
        method: 'GET',
        credentials: 'include' as const,
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
        } catch (error: any) {
          console.error('Failed to load user:', error);
       
        }
      },
  }),
  }), 
  
});

export const { useRefreshTokenQuery,useLoadUserQuery } = apiSlice;
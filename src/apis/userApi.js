import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // hello: builder.query({
    //   query: () => "/",
    // }),

    registerUser: builder.mutation({
      query: (user) => ({
        url: "/api/auth/register",
        method: "POST",
        body: user,
      }),
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: "/api/auth/login",
        method: "POST",
        body: user,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "GET",
      }),
    }),

    getUserProfile: builder.query({
      query: () => "/api/auth/profile",
    }),

    updateUserProfile: builder.mutation({
      query: (user) => ({
        url: "/api/auth/update",
        method: "PUT",
        body: user,
      }),
    }),

    getAllUsers: builder.query({
      query: () => "/api/admin/users",
    }),

    editUser: builder.mutation({
      query: ({ body, id }) => ({
        url: `/api/admin/user/${id}`,
        method: "PUT",
        body: body,
      }),
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/admin/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  // useHelloQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useGetAllUsersQuery,
  useEditUserMutation,
  useDeleteUserMutation,
} = userAPi;

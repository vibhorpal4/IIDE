import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const baseUrl = "";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/api/v1/posts`,
      providesTags: ["Posts"],
    }),
    getPost: builder.query({
      query: (id) => `/api/v1/posts/${id}`,
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (body) => ({
        url: `/api/v1/posts`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/v1/posts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/v1/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
} = postApi;

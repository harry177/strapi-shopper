import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";

const API_URL = "http://localhost:1337/api";

interface IUserData {
  identifier: string;
  password: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints(build) {
    return {
      query: build.query({ query: () => ({ url: "/query", method: "get" }) }),
      loginUser: build.mutation({
        query: (user: IUserData) => ({
          url: "/auth/local",
          method: "post",
          data: user,
        }),
      }),
    };
  },
});

export const { useLoginUserMutation } = api;

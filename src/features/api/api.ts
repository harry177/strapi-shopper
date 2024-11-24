import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";
import { ILoginUser, IReturnedProduct, ISignupUser } from "../types";
import { API_URL } from "./instance";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints(build) {
    return {
      getProducts: build.query<IReturnedProduct, void>({
        query: () => ({ url: "/products?populate=*", method: "get" }),
      }),
      signupUser: build.mutation({
        query: (user: ISignupUser) => ({
          url: "/auth/local/register",
          method: "post",
          data: user,
        }),
      }),
      loginUser: build.mutation({
        query: (user: ILoginUser) => ({
          url: "/auth/local",
          method: "post",
          data: user,
        }),
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useSignupUserMutation,
  useLoginUserMutation,
} = api;

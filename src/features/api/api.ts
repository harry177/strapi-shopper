import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";
import {
  ILoginUser,
  IReturnedProduct,
  IReturnedProducts,
  ISignupUser,
} from "../types";
import { API_URL } from "./instance";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints(build) {
    return {
      getProducts: build.query<IReturnedProducts, void>({
        query: () => ({ url: "/products?populate=*", method: "get" }),
      }),
      getProduct: build.query<IReturnedProduct, string>({
        query: (id) => ({ url: `/products/${id}`, method: "get" }),
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
      addToCart: build.mutation<
        void,
        { id: number; userId: string; userDocumentId: string, token: string }
      >({
        query: ({ id, userId, userDocumentId, token }) => ({
          /*url: `/users/${userId}?populate[cart][populate]=*`,
          method: "get",*/
          url: `/users/${userId}/cart`,
          method: "put",
          data: { userId: userDocumentId, productId: id },
          /*url: `/users/${userId}`,
          method: "put",
          data: {
            newCart: { connect: [id] },
          },*/
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSignupUserMutation,
  useLoginUserMutation,
  useAddToCartMutation,
} = api;

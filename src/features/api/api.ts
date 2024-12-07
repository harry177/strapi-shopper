import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./baseQuery";
import {
  ICartData,
  ILoginUser,
  IReturnedProduct,
  IReturnedProducts,
  ISignupUser,
  IUser,
} from "../types";
import { API_URL } from "./instance";

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["User"],
  endpoints(build) {
    return {
      getProducts: build.query<IReturnedProducts, void>({
        query: () => ({ url: "/products?populate=*", method: "get" }),
      }),
      getProduct: build.query<IReturnedProduct, string>({
        query: (id) => ({ url: `/products/${id}?populate=*`, method: "get" }),
      }),
      getCart: build.query<IUser, ICartData>({
        query: (params) => ({
          url: `/users/${params.userId}?populate[cart][populate][product][populate]=*`,
          method: "get",
        }),
        providesTags: ["User"],
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
        { id: number; userId: string; userDocumentId: string; token: string }
      >({
        query: ({ id, userId, userDocumentId, token }) => ({
          url: `/users/${userId}/add-to-cart`,
          method: "put",
          data: { userId: userDocumentId, productId: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["User"],
      }),
      removeFromCart: build.mutation<
        void,
        { id: number; userId: string; userDocumentId: string; token: string }
      >({
        query: ({ id, userId, userDocumentId, token }) => ({
          url: `/users/${userId}/remove-from-cart`,
          method: "put",
          data: { userId: userDocumentId, productId: id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        invalidatesTags: ["User"],
      }),
    };
  },
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCartQuery,
  useSignupUserMutation,
  useLoginUserMutation,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = api;

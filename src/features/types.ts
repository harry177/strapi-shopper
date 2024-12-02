import { IProduct } from "../components/types";

export interface IUser {
  id: string;
  documentId: string;
  username: string;
  cart: IReturnedCartItem[];
}

export interface IAuthUser {
  jwt: string;
  user: IUser;
}

export interface ILoginUser {
  identifier: string;
  password: string;
}

export interface ISignupUser {
  username: string;
  email: string;
  password: string;
}

export interface ICartData {
  userId: string;
  token: string;
}

export interface IProductImage {
  url: string;
  alt: string;
}

export interface IReturnedProduct {
  data: IProduct;
}

export interface IReturnedProducts {
  data: IProduct[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IReturnedCartItem {
  id: number;
  product: IProduct[];
}

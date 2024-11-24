import { IProduct } from "../components/types";

export interface ILoginUser {
  identifier: string;
  password: string;
}

export interface ISignupUser {
  username: string;
  email: string;
  password: string;
}

export interface IProductImage {
  url: string;
  alt: string;
}

export interface IReturnedProduct {
    data: IProduct[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCOunt: number;
        total: number;
      }
    }
  }
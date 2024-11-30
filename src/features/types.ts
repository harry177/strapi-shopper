import { IProduct } from "../components/types";

export interface IAuthUser {
  jwt: string,
  user: {
    id: string,
    documentId: string;
    username: string,
  }
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
      }
    }
  }
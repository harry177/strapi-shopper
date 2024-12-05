import type { FormInstance } from "antd";
import { IProductImage } from "../features/types";

export interface IAuthFrame {
  isLogin: boolean;
}

export interface IProduct {
  documentId?: string;
  slug?: number;
  Title: string;
  Price: number;
  Image: IProductImage[];
}

export interface ISubmitButton {
  form: FormInstance;
}

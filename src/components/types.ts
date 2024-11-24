import { IProductImage } from "../features/types";

export interface IProduct {
    id?: number;
    Title: string;
    Price: number;
    Image: IProductImage[]
  }
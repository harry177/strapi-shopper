import { IProductImage } from "../features/types";

export interface IProduct {
    documentId?: string;
    slug?: number;
    Title: string;
    Price: number;
    Image: IProductImage[]
  }
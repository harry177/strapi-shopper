import { IProductImage } from "../features/types";

export interface IProduct {
    id: number;
    documentId?: string;
    Title: string;
    Price: number;
    Image: IProductImage[]
  }
import { IProduct } from "@/entities/product";

export interface IAddToCart {
  product_id: number;
  quantity: number;
  userEmail: string;
}

export interface ICart {
  cart_price: number;
  items: ICartProduct[];
}

export interface ICartProduct extends IProduct {
  all_price: number;
  quantity: number;
}

export interface IClearCart {
  userEmail: string;
}

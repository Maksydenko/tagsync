export interface ICheckout {
  address: string;
  city: string;
  fullName: string;
  phone: string;
  userEmail: string;
}

export interface IOrder {
  address: string;
  city: string;
  full_name: string;
  items: IOrderProduct[];
  order_time: string;
  phone: string;
  total_order_price: number;
}

export interface IOrderProduct {
  images: string[];
  price_per_item: number;
  product_id: number;
  product_title: string;
  quantity: number;
  slug: string;
  total_price: number;
}

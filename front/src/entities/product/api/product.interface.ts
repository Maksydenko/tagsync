export interface IProduct {
  id: number;
  images: string[];
  price: string;
  product_parameters: IProductParameter[];
  rating: number;
  title: string;
}

export interface IProductParameter {
  name: string;
  value: string;
}

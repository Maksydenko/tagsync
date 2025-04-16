import { ITranslations } from "@/shared/api";

export interface IProduct {
  characteristics: IProductCharacteristic[];
  images: string[];
  price: string;
  product_id: number;
  rating: number;
  title: string;
}

export interface IProductCharacteristic {
  name: string;
  translations: ITranslations;
  value: string;
  value_translations: ITranslations;
}

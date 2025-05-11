import { ITranslations } from "@/shared/api";

export interface IProduct {
  average_rating: null | number;
  characteristics: IProductCharacteristic[];
  images: string[];
  price: string;
  product_id: number;
  slug: string;
  title: string;
  translations_slug: ITranslations;
  views: number;
}

export interface IProductCharacteristic {
  name: string;
  translations: ITranslations;
  value: string;
  value_translations?: ITranslations;
}

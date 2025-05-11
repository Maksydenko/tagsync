import { IProduct } from "@/entities/product";

import { ITranslations } from "@/shared/api";

export interface ICategory {
  count: number;
  slug: string;
  translations_slug: ITranslations;
}

export interface IProducts {
  count_category: number;
  count_pages: number;
  products: IProduct[];
}

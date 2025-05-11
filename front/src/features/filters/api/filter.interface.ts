import { ITranslations } from "@/shared/api";

import { FilterType } from "./filterType.enum";

export interface IFilter {
  name: string;
  translations?: ITranslations;
  type: FilterType;
  values: string[];
  values_translations?: ITranslations;
}

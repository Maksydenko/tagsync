import { useTranslations } from "next-intl";

import { SortOrder } from "@/shared/model";

import { SortParam } from "./sortParam.enum";

export const getSortsData = (tCategory: ReturnType<typeof useTranslations>) => {
  return [
    {
      label: tCategory("sorts.price-asc"),
      value: SortParam.Price + "," + SortOrder.Asc,
    },
    {
      label: tCategory("sorts.price-desc"),
      value: SortParam.Price + "," + SortOrder.Desc,
    },
    {
      label: tCategory("sorts.rating"),
      value: SortParam.Rating,
    },
  ];
};

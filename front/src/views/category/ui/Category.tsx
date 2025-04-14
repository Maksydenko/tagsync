import { FC, Suspense } from "react";

import { Filters, IFilter } from "@/entities/category";

import { CategoryHeader } from "./CategoryHeader/CategoryHeader";
import { Products } from "./Products/Products";

import s from "./Category.module.scss";

// TODO: handle real filters
export const filtersData: IFilter[] = [
  {
    list: [
      {
        name: "Nvidia",
        value: "nvidia",
      },
      {
        name: "AMD",
        value: "amd",
      },
    ],
    name: "Brands",
    value: "brands",
  },
  {
    list: [
      {
        name: "GPU",
        value: "gpu",
      },
      {
        name: "CPU",
        value: "cpu",
      },
    ],
    name: "Category",
    value: "categories",
  },
];

export const Category: FC = () => {
  return (
    <div className={s.categoryPage}>
      <section className={s.category}>
        <div className={s.category__container}>
          <div className={s.category__body}>
            <CategoryHeader
              className={s.category__header}
              filtersData={filtersData}
            />
            <div className={s.category__content}>
              <Suspense>
                <Filters
                  className={s.category__filters}
                  filtersData={filtersData}
                />
                <Products className={s.category__products} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

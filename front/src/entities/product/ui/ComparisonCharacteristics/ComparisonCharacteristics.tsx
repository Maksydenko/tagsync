"use client";

import { FC, useMemo } from "react";
import { useLocale } from "next-intl";
import { clsx } from "clsx";

import { ColumnDef } from "@tanstack/react-table";

import { IProduct, ProductCard } from "@/entities/product";

import { ILink, Locale } from "@/shared/model";

import { ComparisonCharacteristicsTable } from "./ComparisonCharacteristicsTable/ComparisonCharacteristicsTable";

import s from "./ComparisonCharacteristics.module.scss";

// TODO: handle real wishlistProducts
const productsData: IProduct[] = Array.from(
  {
    length: 3,
  },
  (_, index) => ({
    characteristics: [
      {
        name: "price",
        translations: {
          en: "Price",
          uk: "Ціна",
        },
        value: "13999",
        value_translations: {
          en: "13999 UAH",
          uk: "13999 ₴",
        },
      },
      {
        name: "price1",
        translations: {
          en: "Price1",
          uk: "Ціна1",
        },
        value: "13999",
        value_translations: {
          en: "13999 UAH",
          uk: "13999 ₴",
        },
      },
      {
        name: "price2",
        translations: {
          en: "Price2",
          uk: "Ціна2",
        },
        value: "13999",
        value_translations: {
          en: "13999 UAH",
          uk: "13999 ₴",
        },
      },
    ],
    images: [
      "/img/logos/logo.png",
      "/img/logos/logo.png",
      "/img/logos/logo.png",
    ],
    price: "14499",
    product_id: index,
    rating: 3.5,
    title: "GeForce RTX 3060 ASUS Dual",
  })
);

interface ComparisonCharacteristicsProps {
  className?: string;
}

export const ComparisonCharacteristics: FC<ComparisonCharacteristicsProps> = ({
  className,
}) => {
  const locale = useLocale() as Locale;

  const data = useMemo<ILink<string[]>[]>(() => {
    const allCharacteristics = new Map<
      string,
      {
        label: string;
        value: string[];
      }
    >();

    productsData.forEach((product, index) => {
      product.characteristics.forEach((characteristic) => {
        const label = characteristic.translations.uk || characteristic.name;

        if (!allCharacteristics.has(characteristic.name)) {
          allCharacteristics.set(characteristic.name, {
            label,
            value: Array(productsData.length).fill("—"),
          });
        }

        const entry = allCharacteristics.get(characteristic.name)!;
        entry.value[index] =
          characteristic.value_translations[locale] ||
          characteristic.value ||
          "—";
      });
    });

    return Array.from(allCharacteristics.values());
  }, [locale]);

  const columns = useMemo<ColumnDef<ILink<string[]>>[]>(() => {
    return productsData.map((product, index) => ({
      cell: ({ row }) => row.original.value[index],
      header: () => (
        <ProductCard
          className={s.comparisonCharacteristics__productCard}
          productData={product}
        />
      ),
      id: product.product_id.toString(),
    }));
  }, []);

  return (
    <div className={clsx(s.comparisonCharacteristics, className)}>
      <div className={s.comparisonCharacteristics__body}>
        <ComparisonCharacteristicsTable
          className={s.comparisonCharacteristics__table}
          columns={columns}
          data={data}
          productsDataLength={productsData.length}
        />
      </div>
    </div>
  );
};

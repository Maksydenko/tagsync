"use client";

import { FC, useMemo } from "react";
import { useLocale } from "next-intl";
import { clsx } from "clsx";
import { useAtom } from "jotai";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

import { ComparisonsService } from "@/features/comparisons";

import { ProductCard } from "@/entities/product";

import { userAtom } from "@/shared/lib";
import { ILink, Locale, QueryKey } from "@/shared/model";
import { Loader } from "@/shared/ui";

import { ComparisonCharacteristicsTable } from "./ComparisonCharacteristicsTable/ComparisonCharacteristicsTable";

import s from "./ComparisonCharacteristics.module.scss";

interface ComparisonCharacteristicsProps {
  className?: string;
}

export const ComparisonCharacteristics: FC<ComparisonCharacteristicsProps> = ({
  className,
}) => {
  const locale = useLocale() as Locale;
  const [{ data: userData }] = useAtom(userAtom);

  const userEmail = userData?.data.email;

  const { data: comparisonsData, isLoading: isComparisonsLoading } = useQuery({
    enabled: !!userEmail,
    queryFn: async () => {
      if (!userEmail) {
        return;
      }

      return ComparisonsService.get(userEmail);
    },
    queryKey: [QueryKey.Comparisons, userEmail],
  });
  const comparisonsRecord = comparisonsData?.data;

  const groups = useMemo(() => {
    if (!comparisonsRecord) {
      return [];
    }

    return Object.entries(comparisonsRecord).map(([groupId, products]) => {
      const data: ILink<string[]>[] = (() => {
        const allCharacteristics = new Map<
          string,
          {
            label: string;
            value: string[];
          }
        >();

        products.forEach((product, index) => {
          product.characteristics.forEach((characteristic) => {
            const label = characteristic.translations.uk || characteristic.name;

            if (!allCharacteristics.has(characteristic.name)) {
              allCharacteristics.set(characteristic.name, {
                label,
                value: Array(products.length).fill("—"),
              });
            }

            const entry = allCharacteristics.get(characteristic.name)!;
            entry.value[index] =
              characteristic?.value_translations?.[locale] ||
              characteristic.value ||
              "—";
          });
        });

        return Array.from(allCharacteristics.values());
      })();

      const columns: ColumnDef<ILink<string[]>>[] = products.map(
        (product, index) => ({
          cell: ({ row }) => row.original.value[index],
          header: () => (
            <ProductCard
              key={product.product_id}
              className={s.comparisonCharacteristics__productCard}
              productData={product}
              isStable
            />
          ),
          id: product.product_id.toString(),
        })
      );

      return {
        columns,
        data,
        groupId,
        products,
      };
    });
  }, [comparisonsRecord, locale]);

  return (
    <div className={clsx(s.comparisonCharacteristics, className)}>
      {isComparisonsLoading ? (
        <Loader className={s.comparisonCharacteristics__loader} />
      ) : (
        <div className={s.comparisonCharacteristics__body}>
          {groups.map(
            ({
              columns: groupColumns,
              data: groupData,
              groupId,
              products: groupProducts,
            }) => (
              <div key={groupId} className={s.comparisonCharacteristics__group}>
                <ComparisonCharacteristicsTable
                  className={s.comparisonCharacteristics__table}
                  columns={groupColumns}
                  data={groupData}
                  productsDataLength={groupProducts.length}
                />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

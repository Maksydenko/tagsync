"use client";

import { FC } from "react";
import { clsx } from "clsx";
import { useAtom } from "jotai";

import { ProductCard } from "@/entities/product";

import { userAtom, wishlistAtom } from "@/shared/lib";
import { Loader } from "@/shared/ui";

import s from "./WishlistProducts.module.scss";

interface WishlistProductsProps {
  className?: string;
}

export const WishlistProducts: FC<WishlistProductsProps> = ({ className }) => {
  const [{ data: userData, isLoading: isUserLoading }] = useAtom(userAtom);
  const userEmail = userData?.data.email;

  const [{ data: wishlistData, isLoading: isWishlistLoading }] = useAtom(
    wishlistAtom(userEmail)
  );

  return (
    <div className={clsx(s.wishlistProducts, className)}>
      {isWishlistLoading || isUserLoading ? (
        <Loader className={s.wishlistProducts__loader} />
      ) : (
        <div className={s.wishlistProducts__body}>
          {wishlistData?.data.map((product) => (
            <ProductCard key={product.product_id} productData={product} />
          ))}
        </div>
      )}
    </div>
  );
};

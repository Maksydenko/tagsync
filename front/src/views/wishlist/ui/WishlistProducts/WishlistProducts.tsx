"use client";

import { FC } from "react";
import { clsx } from "clsx";

import { useQuery } from "@tanstack/react-query";

import { AuthService } from "@/features/auth";
import { WishlistService } from "@/features/wishlist";

import { ProductCard } from "@/entities/product";

import { QueryKey } from "@/shared/model";
import { Loader } from "@/shared/ui";

import s from "./WishlistProducts.module.scss";

interface WishlistProductsProps {
  className?: string;
}

export const WishlistProducts: FC<WishlistProductsProps> = ({ className }) => {
  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryFn: async () => AuthService.getUserData(),
    queryKey: [QueryKey.User],
  });
  const userEmail = userData?.data.email;

  const { data: wishlistData, isLoading: isWishlistLoading } = useQuery({
    enabled: !!userEmail,
    queryFn: async () => {
      if (!userEmail) {
        return;
      }

      return WishlistService.get(userEmail);
    },
    queryKey: [QueryKey.Wishlist, userEmail],
  });

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

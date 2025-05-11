"use client";

import { FC, useEffect } from "react";
import { useTranslations } from "next-intl";

import { useQuery } from "@tanstack/react-query";

import { AuthService } from "@/features/auth";
import { ProductsService } from "@/features/products";

import { IProduct, ProductsSlider } from "@/entities/product";
import { IReview } from "@/entities/review";

import { QueryKey, Translation } from "@/shared/model";

import { Characteristics } from "./Characteristics/Characteristics";
import { ProductHeader } from "./ProductHeader/ProductHeader";
import { ProductMain } from "./ProductMain/ProductMain";
import { ProductSliders } from "./ProductSliders/ProductSliders";
import { Reviews } from "./Reviews/Reviews";

import s from "./Product.module.scss";

interface ProductProps {
  productData: IProduct;
  relatedData: IProduct[];
  reviewsData: IReview[];
  similarData: IProduct[];
}

export const Product: FC<ProductProps> = ({
  productData,
  relatedData,
  reviewsData,
  similarData,
}) => {
  const { characteristics, images, product_id, title } = productData;
  const tProduct = useTranslations(Translation.Product);

  const { data: userData } = useQuery({
    queryFn: async () => AuthService.getUserData(),
    queryKey: [QueryKey.User],
  });
  const userEmail = userData?.data.email;

  useEffect(() => {
    if (!userEmail) {
      return;
    }

    ProductsService.trackView({
      product_id,
      userEmail,
    });
  }, [product_id, userEmail]);

  return (
    <div className={s.productPage}>
      <div className={s.product}>
        <div className={s.product__container}>
          <div className={s.product__body}>
            <ProductHeader
              className={s.product__header}
              productData={productData}
            />
            <div className={s.product__content}>
              <ProductSliders
                className={s.product__sliders}
                images={images}
                title={title}
              />
              <ProductMain
                className={s.product__main}
                productData={productData}
                reviewsLength={reviewsData.length}
              />
              <Characteristics characteristics={characteristics} />
            </div>
            <ProductsSlider
              productsData={relatedData}
              title={tProduct("related-products")}
            />
            <ProductsSlider
              productsData={similarData}
              title={tProduct("similar-products")}
            />
            <Reviews
              className={s.product__reviews}
              productId={product_id}
              reviewsData={reviewsData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

import { NextPage } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { StatusCodes } from "http-status-codes";

import Product from "@/views/product";

import { ProductsService } from "@/features/products";
import { RecommendationsService } from "@/features/recommendations";
import { ReviewsService } from "@/features/reviews";

import { IPageProps } from "@/shared/model";

const ProductPage: NextPage<IPageProps> = async (props) => {
  const params = await props.params;
  const { categorySlug, locale, productId } = params;

  setRequestLocale(locale);

  try {
    const [productsData, reviewsData, similarData, relatedData] =
      await Promise.all([
        ProductsService.getAll(
          `?category=${categorySlug}&product_id=${productId}`
        ),
        ReviewsService.get(productId),
        RecommendationsService.getSimilar(productId),
        RecommendationsService.getCompatible(productId),
      ]);

    const [productData] = productsData.data.products;

    if (!productData) {
      throw new Error(StatusCodes.NOT_FOUND.toString());
    }

    return (
      <Product
        productData={productData}
        relatedData={relatedData.data}
        reviewsData={reviewsData.data}
        similarData={similarData.data}
      />
    );
  } catch {
    return notFound();
  }
};

export default ProductPage;

export const generateMetadata = async ({ params }: IPageProps) => {
  const { productId } = await params;
  const productData = await ProductsService.getAll(`?product_id=${productId}`);

  return {
    revalidate: process.env.REVALIDATE_TIMEOUT,
    title: productData.data.products?.[0].title,
  };
};

import { cache } from 'react';
import { NextPage } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { StatusCodes } from 'http-status-codes';

import Product from '@/views/product';

import { ProductsService } from '@/features/products';
import { RecommendationsService } from '@/features/recommendations';
import { ReviewsService } from '@/features/reviews';

import { generateMetaTitle } from '@/shared/lib';
import { IPageProps } from '@/shared/model';

const getProductById = cache(async (categorySlug: string, productId: string) =>
  ProductsService.getAll(`?category=${categorySlug}&product_id=${productId}`)
);

const ProductPage: NextPage<IPageProps> = async props => {
  const params = await props.params;
  const { categorySlug, locale, productId } = params;

  setRequestLocale(locale);

  try {
    const [productsData, reviewsData, similarData, relatedData] =
      await Promise.all([
        getProductById(categorySlug, productId),
        ReviewsService.get(productId),
        RecommendationsService.getSimilar(productId),
        RecommendationsService.getCompatible(productId)
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

/* eslint-disable prefer-const */
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
export let revalidate = Number(process.env.REVALIDATE_TIMEOUT);

export const generateMetadata = async ({ params }: IPageProps) => {
  const { categorySlug, productId } = await params;
  const productData = await getProductById(categorySlug, productId);
  const productTitle = productData.data.products?.[0].title;

  return {
    description: productTitle,
    keywords: productTitle.split(' ').join(','),
    title: generateMetaTitle(productTitle)
  };
};

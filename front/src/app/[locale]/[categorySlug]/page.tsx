import { NextPage } from 'next';
import { setRequestLocale } from 'next-intl/server';

import Category from '@/views/category';

import { ProductsService } from '@/features/products';

import { IPageProps } from '@/shared/model';

const CategoryPage: NextPage<IPageProps> = async props => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { locale } = params;

  setRequestLocale(locale);

  const category = params.categorySlug;
  const limit = process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE;
  const search = new URLSearchParams(searchParams);

  const [filteredData, filtersData] = await Promise.all([
    ProductsService.getFiltered(
      `?category=${category}&${search}&limit=${limit}`
    ),
    ProductsService.getFilters(`?category=${category}`)
  ]);

  return (
    <Category filtersData={filtersData.data} productsData={filteredData.data} />
  );
};

export default CategoryPage;

/* eslint-disable prefer-const */
/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
export let revalidate = Number(process.env.REVALIDATE_TIMEOUT);

export const generateStaticParams = async () => {
  const categories = await ProductsService.getCategories();

  return categories.data.map((category: { slug: string }) => ({
    categorySlug: category.slug
  }));
};

export const generateMetadata = async ({ params }: IPageProps) => {
  const { categorySlug, locale } = await params;
  const filtersData = await ProductsService.getFiltered(
    `?category=${categorySlug}&limit=1`
  );
  const categoryTitle = filtersData.data.products[0].translations_slug[locale];

  return {
    description: categoryTitle,
    keywords: categoryTitle.split(' ').join(','),
    title: categoryTitle
  };
};

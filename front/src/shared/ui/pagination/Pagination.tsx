"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { clsx } from "clsx";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

import { SlideDirection, sortSearchParams, Translation } from "@/shared/model";
import { SearchParam } from "@/shared/model";

import { Img } from "../img/Img";

import s from "./Pagination.module.scss";

interface PaginationProps extends Omit<ReactPaginateProps, "pageCount"> {
  className?: string;
  itemsPerPage: number;
  itemsPerTotal: number;
  pageRangeDisplayed?: number;
}

export const Pagination: FC<PaginationProps> = ({
  className,
  itemsPerPage,
  itemsPerTotal,
  pageRangeDisplayed = 1,
  ...props
}) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get(SearchParam.Page);

  const tShared = useTranslations(Translation.Shared);

  const page = Number(pageParam) || 1;
  const forcePage = page - 1;
  const pageCount = Math.ceil(itemsPerTotal / itemsPerPage);

  const handlePageChange: ReactPaginateProps["onPageChange"] = ({
    selected,
  }) => {
    const page = ++selected;
    const params = new URLSearchParams(searchParams.toString());

    if (page === 1) {
      params.delete(SearchParam.Page);
    } else {
      params.set(SearchParam.Page, String(page));
    }

    push(`?${sortSearchParams(params)}`);
  };

  const getIcon = (direction: SlideDirection) => (
      <Img
        alt={tShared(`slide-directions.${  direction}`)}
        className={s.pagination__icon}
        src="/img/icons/form/arrow-down.svg"
      />
    );

  return (
    <ReactPaginate
      activeClassName={s.pagination__active}
      activeLinkClassName={s.pagination__activeLink}
      breakClassName={s.pagination__break}
      breakLabel="..."
      breakLinkClassName={s.pagination__breakLink}
      className={clsx(s.pagination, className)}
      disabledClassName={s.pagination__disabled}
      disabledLinkClassName={s.pagination__disabledLink}
      forcePage={forcePage}
      nextClassName={s.pagination__next}
      nextLabel={getIcon(SlideDirection.Next)}
      nextLinkClassName={s.pagination__nextLink}
      pageClassName={s.pagination__page}
      pageCount={pageCount}
      pageLinkClassName={s.pagination__pageLink}
      pageRangeDisplayed={pageRangeDisplayed}
      previousClassName={s.pagination__previous}
      previousLabel={getIcon(SlideDirection.Prev)}
      previousLinkClassName={s.pagination__previousLink}
      onPageChange={handlePageChange}
      {...props}
    />
  );
};

import React, { FC } from 'react';
import { PAGINATION_PAGES } from '../../Helpers/constants';

type Callback = (page: number) => void;

type PaginationButtonsProps = {
  paginationPage: number;
  handlePageChange: Callback;
}

const PaginationButtons: FC<PaginationButtonsProps> = ({
  paginationPage,
  handlePageChange,
}) => (
  <div className="container-feedline__buttons">
    {PAGINATION_PAGES.map((page) => (
      <button
        key={page}
        type="button"
        className={page !== paginationPage
          ? 'pagination-button'
          : 'pagination-button pagination-button--active'}
        onClick={() => handlePageChange(page)}
        tabIndex={-1}
      >
        {page}
      </button>
    ))}
  </div>
);

export default PaginationButtons;

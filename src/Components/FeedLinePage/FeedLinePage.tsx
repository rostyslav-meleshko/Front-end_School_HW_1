import React, { FC, useState, useMemo } from 'react';

import { useServersRequest } from '../../hooks/useServerRequest';
import FeedContent from './FeedContent';
import Loader from '../Loader/Loader';
import PaginationButtons from './PaginationButtons';
import ErrorBlock from './ErrorBlock';
import './FeedLinePage.scss';
import { REQUEST_URL } from '../../Helpers/constants';

export const PAGINATION_PAGES = [1, 2, 3];

const FeedLinePage: FC = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const feedCountPerPage = 10;

  const {
    isServerResponded,
    data: feedLine,
    isServerError,
  } = useServersRequest<REQUEST_URL.FEED>(REQUEST_URL.FEED);

  const handlePageChange = (page: number) => {
    if (page !== paginationPage) {
      setPaginationPage(page);
    }
  };

  const showableFeedLine = useMemo(() => {
    const indexStart = (feedCountPerPage * paginationPage) - feedCountPerPage;
    const indexEnd = (feedCountPerPage * paginationPage) - 1;

    return feedLine ? (
      [...feedLine].slice(indexStart, indexEnd)
    ) : [];
  }, [paginationPage, feedLine]);

  return (
    <div className="container-feedline">
      {!isServerResponded
      && (
        <>
          <Loader />
          <div>Loading trending videos...</div>
        </>
      )}

      {showableFeedLine.length > 0
      && (
        <div className="container-feedline__buttons">
          <PaginationButtons
            paginationPage={paginationPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}

      {isServerError && <ErrorBlock />}

      {showableFeedLine.map((feed) => (
        <div className="feed-container" key={feed.id}>
          <FeedContent feed={feed} />
        </div>
      ))}

      {showableFeedLine.length > 0
      && (
        <div className="container-feedline__buttons">
          <PaginationButtons
            paginationPage={paginationPage}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default FeedLinePage;

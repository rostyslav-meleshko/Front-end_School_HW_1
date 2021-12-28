import React, { FC } from 'react';

import { useServersRequest } from '../../hooks/useServerRequest';
import Loader from '../Loader/Loader';
import ErrorBlock from '../FeedLinePage/ErrorBlock';
import { REQUEST_URL, VIDEO_SIZE_USER } from '../../Helpers/constants';

const UserFeed: FC = () => {
  // as server api with user feed working not correctly, I'm fetching standard feedline
  // in case of working server, just need to replace url in hook useServerRequest
  const {
    isServerResponded,
    data: feedLine,
    isServerError,
  } = useServersRequest<REQUEST_URL.FEED>(REQUEST_URL.FEED);

  const isFeedline = isServerResponded && !isServerError && feedLine;
  const isErrorMessage = isServerResponded && !isServerError && !feedLine;

  return (
    <>
      {!isServerResponded
      && (
        <>
          <Loader />
          <div>Loading user videos...</div>
        </>
      )}

      {isServerError && <ErrorBlock />}

      {isFeedline
      && (
        <div className="user-container__user-feed">
          {feedLine.map((feed) => (
            <div key={feed.id}>
              <video
                preload="true"
                loop
                width={VIDEO_SIZE_USER.WIDTH}
                height={VIDEO_SIZE_USER.HEIGHT}
                controls
                muted
                playsInline
              >
                <source src={feed.videoUrl} />
              </video>
            </div>
          ))}
        </div>
      )}

      {isErrorMessage
      && <h2>No data at the moment. Please reload page</h2>}
    </>
  );
};

export default UserFeed;

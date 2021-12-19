import React, { FC, useEffect } from 'react';
import { FeedLine } from '../../typesDef';
import serverRequest from '../../Helpers/api';
import Loader from '../Loader/Loader';
import ErrorBlock from '../FeedLinePage/ErrorBlock';

const UserFeed: FC = () => {
  const [feedLine, setFeedLine] = React.useState<FeedLine[] | []>([]);
  const [isServerResponded, setIsServerResponded] = React.useState<boolean>(false);
  const [isServerError, setIsServerError] = React.useState<boolean>(false);

  // as server api with user feed working not correctly, a fetched standard feedline
  const getFeedLineFromServer = async () => {
    const serverResponse = await serverRequest('/trending/feed');
    try {
      setFeedLine(serverResponse);
      setIsServerResponded(true);
    } catch (error) {
      setIsServerResponded(true);
      setIsServerError(true);
      console.warn(error);
    }
  };

  useEffect(() => {
    getFeedLineFromServer();
  }, []);

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

      {isServerResponded && !isServerError
      && (
        <div className="user-container__user-feed">
          {feedLine.map((feed) => (
            <div key={feed.id}>
              <video
                preload="true"
                loop
                width="207"
                height="370"
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

      {isServerResponded && !isServerError && feedLine.length === 0
      && <h2>No data at the moment. Please reload page</h2>}
    </>
  );
};

export default UserFeed;

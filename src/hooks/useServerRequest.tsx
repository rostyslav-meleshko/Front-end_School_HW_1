import { useEffect, useState } from 'react';

import { FeedLine, IUser } from '../typesDef';
import { REQUEST_URL } from '../Helpers/constants';

type ResponseData<T> = T extends REQUEST_URL.FEED
  ? FeedLine[]
  : IUser;

interface UseServersResponse<T extends REQUEST_URL> {
  isServerResponded: boolean;
  data: ResponseData<T> | null;
  isServerError: boolean;
}

export const useServersRequest = <T extends REQUEST_URL>(
  url: string,
): UseServersResponse<T> => {
  const [isServerResponded, setIsServerResponded] = useState(true);
  const [data, setData] = useState(null);
  const [isServerError, setIsServerError] = useState(false);

  useEffect(() => {
    setIsServerResponded(false);

    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': `${process.env.REACT_APP_API_HOST}`,
            'x-rapidapi-key': `${process.env.REACT_APP_API_KEY}`,
          },
        });
        const respondedData = await response?.json();

        setData(respondedData);
      } catch (error) {
        setIsServerError(true);
      } finally {
        setIsServerResponded(true);
      }
    };

    fetchData();
  }, [url]);

  return { isServerResponded, data, isServerError };
};

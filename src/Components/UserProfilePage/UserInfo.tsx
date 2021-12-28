import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { useServersRequest } from '../../hooks/useServerRequest';
import { IMAGE_SIZE_USER, REQUEST_URL } from '../../Helpers/constants';
import { stateAuthorMeta } from '../../redux/selectors';
import roundCommentsValue from '../../Helpers/functions';
import Loader from '../Loader/Loader';
import ErrorBlock from '../FeedLinePage/ErrorBlock';

type MatchParams = {
  userName: string;
}

const UserInfo: FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { userName } = match.params;
  const authorMeta = useSelector(stateAuthorMeta);
  const isDesktop = window.outerWidth > 640;
  const userUrl = `${REQUEST_URL.BASE_URL}/user/info/${userName}`;

  // this code written as simulation of calling server,
  // as no useful data coming from required api method,
  // and userInfo should be used, in case correct data will come from API
  // in this case, need to add required url to the useServerRequest and adjust type definitions

  const {
    isServerResponded,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: userInfo,
    isServerError,
  } = useServersRequest(userUrl);

  const showUserData = authorMeta !== null && isServerResponded && !isServerError;

  return (
    <>
      {!isServerResponded
      && (
        <>
          <Loader />
          <div>Loading user info...</div>
        </>
      )}

      {isServerError && <ErrorBlock />}

      {showUserData
      && (
        <div className="user-container__user-info">
          <div className="user-card">
            <div className="user-card__avatar">
              <img
                height={isDesktop ? IMAGE_SIZE_USER.DESKTOP : IMAGE_SIZE_USER.MOBILE}
                width={isDesktop ? IMAGE_SIZE_USER.DESKTOP : IMAGE_SIZE_USER.MOBILE}
                src={authorMeta?.avatar}
                alt="user_avatar"
              />
            </div>

            <div className="user-card__info">
              <h1>{authorMeta.nickName}</h1>
              <h2>{authorMeta.name}</h2>
              <h3>
                Total videos -
                {authorMeta.video}
              </h3>
              <h3>
                Fans -
                {roundCommentsValue(authorMeta.fans)}
              </h3>
              <h3>
                Likes -
                {roundCommentsValue(authorMeta.heart)}
              </h3>
              <h3>
                Following -
                {authorMeta.following}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withRouter(UserInfo);

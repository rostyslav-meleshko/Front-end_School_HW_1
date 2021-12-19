import { FC, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IUserInfo } from '../../typesDef';
import serverRequest from '../../Helpers/api';
import { stateAuthorMeta } from '../../Redux/store';
import roundCommentsValue from '../../Helpers/functions';
import Loader from '../Loader/Loader';
import ErrorBlock from '../FeedLinePage/ErrorBlock';

type MatchParams = {
  userName: string;
}

const UserInfo: FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const { userName } = match.params;
  const authorMeta = useSelector(stateAuthorMeta);

  // this code written as simulation of calling server,
  // as no useful data coming from required api method,
  // and userInfo should be used, in case correct data will come from API
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [isServerResponded, setIsServerResponded] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const windowWidth = window.outerWidth;

  // this code written as simulation of calling server,
  // as no useful data coming from required api method
  useEffect(() => {
    const getUserInfo = async () => {
      const userInfoFromServer = await serverRequest(`/user/info/${userName}`);
      try {
        setIsServerResponded(true);
        setUserInfo(userInfoFromServer);
        setIsServerError(false);
      } catch (error) {
        setIsServerResponded(true);
        setIsServerError(true);
        console.warn(error);
      }
    };
    getUserInfo();
  }, [userName]);

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

      {((authorMeta !== null && isServerResponded && !isServerError)
        && (
          <div className="user-container__user-info">
            <div className="user-card">
              <div className="user-card__avatar">
                <img
                  height={windowWidth > 640 ? '220' : '60'}
                  width={windowWidth > 640 ? '220' : '60'}
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
        )
      )}
    </>
  );
};

export default withRouter(UserInfo);

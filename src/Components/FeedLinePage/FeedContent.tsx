/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import { FC, KeyboardEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { FeedLine } from '../../typesDef';
import roundCommentsValue from '../../Helpers/functions';
import { setAuthorMeta } from '../../redux/actions';
import { IMAGE_SIZE_FEED, VIDEO_SIZE_FEED } from '../../Helpers/constants';

type FeedContentProps = {
  feed: FeedLine;
}

const FeedContent: FC<FeedContentProps> = ({ feed }) => {
  const dispatch = useDispatch();
  const isDesktop = window.outerWidth > 640;
  const { authorMeta } = feed;

  const pickUserData = () => {
    dispatch(setAuthorMeta(authorMeta));
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      pickUserData();
    }
  };

  return (
    <>
      <div className="feed-container__avatar">
        <Link to={`/user/${feed.authorMeta.name}`}>
          <img
            src={feed.authorMeta.avatar}
            title={`${feed.authorMeta.name} link`}
            role="link"
            alt="user_avatar"
            height={isDesktop ? IMAGE_SIZE_FEED.DESKTOP : IMAGE_SIZE_FEED.MOBILE}
            width={isDesktop ? IMAGE_SIZE_FEED.DESKTOP : IMAGE_SIZE_FEED.MOBILE}
            onClick={pickUserData}
            onKeyPress={handleKeyPress}
            tabIndex={0}
          />
        </Link>
      </div>

      <div className="feed-container__body feed-content">
        <Link to={`/user/${feed.authorMeta.name}`} className="feed-content__link">
          <div
            className="feed-content__name"
            role="link"
            onClick={pickUserData}
            onKeyPress={handleKeyPress}
            tabIndex={0}
          >
            <span className="feed-content__name--main">
              {feed.authorMeta.name}
            </span>
            <span className="feed-content__name--sub">
              {feed.authorMeta.nickName}
            </span>
          </div>
        </Link>

        <div>{feed.text}</div>

        {feed.hashtags.length > 0
        && (
          <div className="feed-content__hashtags">
            <span>
              {feed.hashtags.map((hashtag) => (
                <span key={hashtag.id} className="feed-content__hashtags--hashtag">
                  #
                  {hashtag.name}
                </span>
              ))}
            </span>
          </div>
        )}

        <div className="feed-content__video">
          <video
            preload="true"
            autoPlay
            loop
            width={isDesktop ? VIDEO_SIZE_FEED.DESKTOP_WIDTH : VIDEO_SIZE_FEED.MOBILE_WIDTH}
            height={isDesktop ? VIDEO_SIZE_FEED.DESKTOP_HEIGHT : VIDEO_SIZE_FEED.MOBILE_HEIGHT}
            controls
            muted
            playsInline
          >
            <source src={feed.videoUrl} />
          </video>
        </div>

        <div className="feed-content__comments">
          <span>
            <b>Comments:</b>
            &nbsp;
            {roundCommentsValue(feed.commentCount)}
            &nbsp;
          </span>
          <span>
            <b>Likes:</b>
            &nbsp;
            {roundCommentsValue(feed.diggCount)}
          </span>
        </div>
      </div>
    </>
  );
};

export default FeedContent;

import { useState } from "react";
import Avatar from "../common/Avatar";
import "./TweetCard.css";

const TweetCard = ({ tweet, onOpen }) => {
  const authorName = tweet?.user ?? "Unknown";
  const text = tweet?.content ?? "";
  const image = tweet?.image ?? "";
  const likesCount = tweet?.likes ?? 0;
  const commentsCount = tweet?.comments ?? 0;

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(likesCount);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = !prev;
      setLikes((count) => count + (next ? 1 : -1));
      return next;
    });
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    setBookmarked((prev) => !prev);
  };

  return (
    <article
      className="tweet-card"
      onClick={() => onOpen?.(tweet)}
      role={onOpen ? "button" : "article"}
      tabIndex={onOpen ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen?.(tweet);
      }}
    >
      <div className="tweet-card__top">
        <Avatar name={authorName} size={48} />
        <div className="tweet-card__body">
          <div className="tweet-card__meta">
            <span className="tweet-card__name">{authorName}</span>
            <span className="tweet-card__handle">@{authorName.toLowerCase()}</span>
          </div>

          <p className="tweet-card__content">{text}</p>

          {image ? (
            <img className="tweet-card__image" src={image} alt="Tweet media" />
          ) : null}

          <div className="tweet-card__actions">
            <button
              className={`tweet-card__action ${liked ? "tweet-card__action--liked" : ""}`}
              onClick={handleLike}
              type="button"
            >
              <span>{liked ? "♥" : "♡"}</span>
              <span>{likes}</span>
            </button>

            <button className="tweet-card__action" type="button">
              <span>💬</span>
              <span>{commentsCount}</span>
            </button>

            <button className="tweet-card__action" type="button">
              <span>↻</span>
            </button>

            <button
              className={`tweet-card__action ${bookmarked ? "tweet-card__action--bookmarked" : ""}`}
              onClick={handleBookmark}
              type="button"
            >
              <span>{bookmarked ? "🔖" : "📑"}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TweetCard;


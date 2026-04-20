import Avatar from "../common/Avatar";

const UserCard = ({ user, onFollow }) => {
  if (!user) return null;

  return (
    <div className="user-card">
      <div className="user-card__left">
        <Avatar src={user.avatar} name={user.name} size={44} />
        <div className="user-card__info">
          <h4 className="user-card__name">{user.name}</h4>
          <p className="user-card__username">@{user.username}</p>
        </div>
      </div>

    <button
  className="user-card__follow"
  onClick={onFollow}
  type="button"
  title={`Follow ${user.name}`}
>
  Follow
</button>


    </div>
  );
};

export default UserCard;

const RightSidebar = () => {
  return (
    <div className="rightSidebar">

      {/* Search */}
      <input className="search" placeholder="Search" />

      {/* News */}
      <div className="card">
        <h3>Today's News</h3>

        <div className="newsItem">
          <p>David Miller's thrilling IPL win</p>
          <span>2 days ago · 63K posts</span>
        </div>

        <div className="newsItem">
          <p>Lenskart boycott controversy</p>
          <span>2 days ago · 206K posts</span>
        </div>
      </div>

      {/* Who to follow */}
      <div className="card">
        <h3>Who to follow</h3>

        <div className="user">
          <div className="info">
            <strong>BTS_official</strong>
            <span>@bts</span>
          </div>
          <button>Follow</button>
        </div>

        <div className="user">
          <div className="info">
            <strong>Tim Cook</strong>
            <span>@timcook</span>
          </div>
          <button>Follow</button>
        </div>
        <div className="user">
          <div className="info">
            <strong>Narendra Modi</strong>
            <span>@Narendra Modi</span>
          </div>
          <button>Follow</button>
        </div>
      </div>

    </div>
  );
};

export default RightSidebar;
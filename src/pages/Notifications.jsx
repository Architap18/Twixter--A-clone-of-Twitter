import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Notifications = () => {
  const { notifications, markNotificationsAsRead } = useContext(AppContext);

  useEffect(() => {
    markNotificationsAsRead();
  }, [markNotificationsAsRead]);

  return (
    <div className="home">
      <div className="home__tabs">
        <span className="active">All Notifications</span>
      </div>
      <div className="feed" style={{ padding: "20px" }}>
        {notifications.length === 0 ? (
          <p style={{ color: "gray", textAlign: "center" }}>No notifications yet.</p>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              style={{
                padding: "15px",
                borderBottom: "1px solid #333",
                display: "flex",
                flexDirection: "column",
                gap: "5px"
              }}
            >
              <span style={{ fontSize: "14px", color: "#1da1f2" }}>
                {notif.type === "follow" ? "🔔 New Follow" : "📩 New Tweet"}
              </span>
              <p style={{ margin: 0, fontSize: "16px", color: "white" }}>
                {notif.message}
              </p>
              <span style={{ fontSize: "12px", color: "gray" }}>
                {new Date(notif.timestamp).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;

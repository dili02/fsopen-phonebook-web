import React from "react";

const Notification = ({ notification }) => {
  return (
    <div className={notification.classNotification}>{notification.message}</div>
  );
};

export default Notification;

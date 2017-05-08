import React from 'react';

const Notification = ({ remove, notification }) => 
  <div 
    className={`${notification.type} notification`}
    onClick={remove.bind(null, notification.id)}
  >
    {notification.text}
  </div>;

Notification.propTypes = {
  notification: React.PropTypes.object.isRequired,
  remove: React.PropTypes.func.isRequired
};

export default Notification;

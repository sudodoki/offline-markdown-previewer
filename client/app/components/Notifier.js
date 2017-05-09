import React from 'react';
import Notification from './Notification';

const Notifier = props => {
  const { 
    notifications,
    removeNotification 
  } = props;

  return (
      <div className='notification-handler'>
        {notifications.map(notification => 
          <Notification 
            key={notification.id}
            notification={notification}
            remove={removeNotification}
          />)
        }
      </div>
  );
};

Notifier.propTypes = {
  notifications: React.PropTypes.array.isRequired,
  removeNotification: React.PropTypes.func.isRequired
};

export default Notifier;

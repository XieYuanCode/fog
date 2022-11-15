export const requestNotificationPermission = () => {
  return Notification.requestPermission()
}

export const sendNotification = (title: string, options?: NotificationOptions) => {
  switch (Notification.permission) {
    case 'default':
      requestNotificationPermission().then((status) => {
        status === 'granted' && sendNotification(title, options)
      })
      break;
    case 'granted':
      // TODO:添加图标
      return new Notification(title, options)
    case 'denied':
      alert('Notification Permission Request Was Denied')
      break;

    default:
      break;
  }
}
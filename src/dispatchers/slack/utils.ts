import NotificationData from './NotificationData';
import * as formatters from './formatters';

export const formatSlackMessage = ({
  text,
  pretext,
  fields,
  color,
}: NotificationData) =>
  JSON.stringify({
    attachments: [
      {
        author_name: 'Cloud Observer',
        pretext,
        text,
        fields,
        color,
      },
    ],
  });

export const prepareNotificationData = (data: any): NotificationData => {
  const sharedNotificationData: NotificationData = {
    text: String(data['detail-type']),
    color: '#DD0000',
  };

  switch (data['detail-type']) {
    case 'ECS Task State Change':
      return {
        ...sharedNotificationData,
        ...formatters.ecsTaskStateChange(data),
      };
    case 'ECS Task State Change':
      return {
        ...sharedNotificationData,
        ...formatters.codeBuildStateChange(data),
      };
  }

  return {
    text: 'Unknown Error',
    color: '#EE0000',
  };
};

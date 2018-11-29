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

export const prepareNotificationData = (jsonBody: any): NotificationData => {
  const sharedNotificationData: NotificationData = {
    text: String(jsonBody['detail-type']),
    color: '#DD0000',
  };

  switch (jsonBody['detail-type']) {
    case 'ECS Task State Change':
      return {
        ...sharedNotificationData,
        ...formatters.ecsTaskStateChange(jsonBody),
      };
  }

  return {
    text: 'Unknown Error',
    color: '#EE0000',
  };
};

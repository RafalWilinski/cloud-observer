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

export const prepareNotificationData = async (
  payload: any,
): Promise<NotificationData> => {
  const data = JSON.parse(payload.Records[0].Sns.Message);
  const sharedNotificationData: NotificationData = {
    text: String(data['detail-type']),
    color: '#DD0000',
  };

  console.log(data);

  switch (data['detail-type']) {
    case 'ECS Task State Change':
      return {
        ...sharedNotificationData,
        ...(await formatters.ecsTaskStateChange(data)),
      };
    case 'CodeBuild Build State Change':
      return {
        ...sharedNotificationData,
        ...(await formatters.codeBuildStateChange(data)),
      };
    case 'CodeDeploy Deployment State-change Notification':
      return {
        ...sharedNotificationData,
        ...formatters.codeDeployDeploymentStateChange(data),
      };
  }

  return {
    text: 'Unknown Error',
    color: '#EE0000',
  };
};

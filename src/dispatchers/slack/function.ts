import * as got from 'got';
import NotificationData from './NotificationData';
import { formatSlackMessage, prepareNotificationData } from './utils';

export const handler = async (data: any) => {
  if (!process.env.WEBHOOK_URL) {
    throw new Error('WEBHOOK_URL is not defined!');
  }

  let notificationData: NotificationData = await prepareNotificationData(data);

  console.log(notificationData);

  await got.post(process.env.WEBHOOK_URL, {
    body: formatSlackMessage(notificationData),
  });

  return;
};

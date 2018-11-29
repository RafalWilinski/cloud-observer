// import { CloudWatchLogsHandler } from 'aws-lambda';
import * as got from 'got';
import formatSlackMessage from './formatSlackMessage';

export const handler = async (jsonBody: any) => {
  if (!process.env.WEBHOOK_URL) {
    throw new Error('WEBHOOK_URL is not defined!');
  }

  let description: string = '';
  let fields: any = {};
  let color: string = '#DD0000';

  switch (jsonBody['detail-type']) {
    case 'ECS Task State Change':
      description = `${jsonBody.detail.taskArn} transitioning from *${
        jsonBody.detail.lastStatus
      }* to *${jsonBody.detail.desiredStatus}* status`;
      fields = [
        {
          title: 'Cluster',
          value: jsonBody.detail.clusterArn,
        },
        {
          title: 'Task Definition',
          value: jsonBody.detail.taskDefinitionArn,
        },
        {
          title: 'Container',
          value: jsonBody.detail.containers[0].containerArn,
        },
        {
          title: 'Region',
          value: jsonBody.region,
        },
      ];
      break;
  }

  await got.post(process.env.WEBHOOK_URL, {
    body: JSON.stringify(
      formatSlackMessage(jsonBody['detail-type'], description, fields, color),
    ),
  });
  return;
};

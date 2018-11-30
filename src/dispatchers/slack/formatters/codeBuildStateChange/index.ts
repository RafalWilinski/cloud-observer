import { CloudWatchLogs } from 'aws-sdk';

const computeColor = (buildStatus: string) => {
  switch (buildStatus) {
    case 'SUCCEEDED':
      return '#00DD00';
    default:
      return '#EE0000';
  }
};

const getLogs = (data: any) => {
  const cloudwatchlogs = new CloudWatchLogs();
  const params = {
    logGroupName: data.detail['additional-information'].logs['group-name'],
    logStreamName: data.detail['additional-information'].logs['stream-name'],
  };

  return `\n\`\`\`\n${cloudwatchlogs.getLogEvents(params).promise()}\n\`\`\``;
};

export const codeBuildStateChange = async (data: any) => ({
  description: `Project ${data.detail['project-name']} *${
    data.detail['build-status']
  }*.${await getLogs(data)}`,
  fields: [
    {
      title: 'Build ID',
      value: data.detail['build-id'],
    },
    {
      title: 'Build Start Time',
      value: data.detail['additional-information']['build-start-time'],
    },
    {
      title: 'Logs',
      value: `<CodeBuild|${
        data.detail['additional-information'].logs['deep-link']
      }>`,
    },
    {
      title: 'Region',
      value: data.region,
    },
  ],
  color: computeColor(data.detail['build-status']),
});
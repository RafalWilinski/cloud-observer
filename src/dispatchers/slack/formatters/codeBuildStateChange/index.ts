import { CloudWatchLogs } from 'aws-sdk';

const computeColor = (buildStatus: string) => {
  switch (buildStatus) {
    case 'SUCCEEDED':
      return '#00DD00';
    default:
      return '#EE0000';
  }
};

const getLogs = async (data: any) => {
  const cloudwatchlogs = new CloudWatchLogs();
  const params = {
    logGroupName: data.detail['additional-information'].logs['group-name'],
    logStreamName: data.detail['additional-information'].logs['stream-name'],
  };
  const logs = await cloudwatchlogs.getLogEvents(params).promise();

  return `\n\`\`\`\n${(logs.events || [])
    .map(e => `${e.timestamp} - ${e.message}`)
    .slice(-30)
    .join('')}\n\`\`\``;
};

export const codeBuildStateChange = async (data: any) => ({
  text: `Project ${data.detail['project-name']} *${
    data.detail['build-status']
  }*.${await getLogs(data)}\n<${
    data.detail['additional-information'].logs['deep-link']
  }|Full logs in CodeBuild>`,
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
      title: 'Region',
      value: data.region,
    },
  ],
  color: computeColor(data.detail['build-status']),
});

import { CloudWatchLogs } from "aws-sdk";

const computeColor = (lastStatus: string) => {
  switch (lastStatus) {
    case "RUNNING":
      return "#00DD00";
    case "PENDING":
      return "#FFD300";
    default:
      return "#EE0000";
  }
};

const getLogs = async (data: any) => {
  console.log(JSON.stringify(data));
  const cloudwatchlogs = new CloudWatchLogs();
  const params = {
    logGroupName: data.detail.containers[0].logs["group-name"],
    logStreamName: data.detail.containers[0].logs["stream-name"]
  };
  const logs = await cloudwatchlogs.getLogEvents(params).promise();

  return `\n\`\`\`\n${(logs.events || [])
    .map(e => `${e.timestamp} - ${e.message}`)
    .slice(-30)
    .join('')}\n\`\`\``;
};

export const ecsTaskStateChange = async (data: any) => ({
  text: `Task ${
    data.detail.taskDefinitionArn.split("/")[1]
  } transitioning from *${data.detail.lastStatus}* to *${
    data.detail.desiredStatus
  }* status.${await getLogs(data)}`,
  fields: [
    {
      title: "Cluster",
      value: data.detail.clusterArn
    },
    {
      title: "Task Definition",
      value: data.detail.taskDefinitionArn
    },
    {
      title: "Container",
      value: data.detail.containers[0].containerArn
    },
    {
      title: "Region",
      value: data.region
    }
  ],
  color: computeColor(data.detail.lastStatus)
});

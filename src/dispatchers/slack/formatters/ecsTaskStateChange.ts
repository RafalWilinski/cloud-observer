const computeColor = (lastStatus: string) => {
  switch (lastStatus) {
    case 'RUNNING':
      return '#00DD00';
    case 'PENDING':
      return '#FFD300';
    default:
      return '#EE0000';
  }
};
export const ecsTaskStateChange = (data: any) => ({
  description: `${data.detail.taskArn} transitioning from *${
    data.detail.lastStatus
  }* to *${data.detail.desiredStatus}* status`,
  fields: [
    {
      title: 'Cluster',
      value: data.detail.clusterArn,
    },
    {
      title: 'Task Definition',
      value: data.detail.taskDefinitionArn,
    },
    {
      title: 'Container',
      value: data.detail.containers[0].containerArn,
    },
    {
      title: 'Region',
      value: data.region,
    },
  ],
  color: computeColor(data.detail.lastStatus),
});

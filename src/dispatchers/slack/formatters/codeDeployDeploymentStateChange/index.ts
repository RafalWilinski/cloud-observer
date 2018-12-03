const computeColor = (deployStatus: string) => {
  switch (deployStatus) {
    case 'SUCCESS':
      return '#00DD00';
    default:
      return '#EE0000';
  }
};

export const codeDeployDeploymentStateChange = (data: any) => ({
  text: `Project ${data.detail.application} deployment changed state to *${
    data.detail.detail.state
  }*`,
  fields: [
    {
      title: 'Deployment ID',
      value: data.detail.deploymentId,
    },
    {
      title: 'Instance Group ID',
      value: data.detail.instanceGroupId,
    },
    {
      title: 'Region',
      value: data.region,
    },
  ],
  color: computeColor(data.detail.state),
});

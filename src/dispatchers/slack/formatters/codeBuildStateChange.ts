const computeColor = (buildStatus: string) => {
  switch (buildStatus) {
    case 'RUNNING':
      return '#00DD00';
    case 'PENDING':
      return '#FFD300';
    default:
      return '#EE0000';
  }
};

export const codeBuildStateChange = (data: any) => ({
  description: `Project ${data.detail['project-name']} *${
    data.detail['build-status']
  }*`,
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

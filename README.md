# Cloud Observer

AWS-CDK based solution for passing various AWS CloudWatch Events to your email or Slack channel.

![Schema](assets/schema.png?raw=true "Schema")

### Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

### Configuration

Cloud Observer is fully configurable using `config.json` file.

Each entry inside main array translates to separate SNS topic subscribed to events defined inside `sources` array and passing them to channels defined in `destinations` array.

```json
[
  {
    "sources": [
      {
        "type": "ecsTaskStateChange" // one of ecsTaskStateChange, <TO BE ADDED...>
      }
    ],
    "destinations": [
      {
        "type": "slack", // slack or email
        "endpoint": "https://hooks.slack.com/services/xxx/yyy/zzz" // webhook url when slack, email address when dealing with email
      }
    ]
  }
]
```

Following configuration will pass all the ECS task state events to the slack channel specified inside `destinations.endpoint` field.

As this software is in heavy development stage, configuration structure is very likely to change.

### Events to be handled
- [x] ECS Task State Change
- [x] CodeDeploy Deployment State Change
- [x] CodeBuild State Change
- [ ] Autoscaling Group state change
- [ ] Workspaces State Change
- [ ] ECS Container Instance State Change
- [ ] EC2 Instance State Change


### Functionality
- [ ] Filtering sources by ARN, region, etc.
- [ ] More friendly config file. YAML or TS file

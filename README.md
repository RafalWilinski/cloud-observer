# Cloud Observer

AWS-CDK based solution for passing various AWS CloudWatch Events to your email or Slack channel.

![Demo](assets/slack.png?raw=true "Demo")

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

As this software is in heavy development stage, configuration structure is very likely to change.

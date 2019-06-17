<h1 align="center">Welcome to cloud-observer 👋</h1>
<p>
  <img src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/RafalWilinski/cloud-observer#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" target="_blank" />
  </a>
  <a href="https://github.com/RafalWilinski/cloud-observer/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" target="_blank" />
  </a>
  <a href="https://github.com/RafalWilinski/cloud-observer/blob/master/LICENSE">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" target="_blank" />
  </a>
  <a href="https://twitter.com/rafalwilinski">
    <img alt="Twitter: rafalwilinski" src="https://img.shields.io/twitter/follow/rafalwilinski.svg?style=social" target="_blank" />
  </a>
</p>

> AWS-CDK based solution for passing various AWS CloudWatch Events to your email or Slack channel.

![Demo](assets/schema.png?raw=true "Demo")

### 🏠 [Homepage](https://github.com/RafalWilinski/cloud-observer#readme)

## Install

```sh
npm install
```

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Configuration

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

## Todo

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
- [ ] More friendly config file. YAML? TS?

## Author

👤 **Rafal Wilinski**

- Twitter: [@rafalwilinski](https://twitter.com/rafalwilinski)
- Github: [@RafalWilinski](https://github.com/RafalWilinski)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/RafalWilinski/cloud-observer/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2019 [RafalWilinski](https://github.com/RafalWilinski).<br />

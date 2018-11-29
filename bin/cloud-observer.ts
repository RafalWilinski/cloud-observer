#!/usr/bin/env node
import sns = require('@aws-cdk/aws-sns');
import sqs = require('@aws-cdk/aws-sqs');
import cdk = require('@aws-cdk/cdk');

class CloudObserverStack extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    const queue = new sqs.Queue(this, 'CloudObserverQueue', {
      visibilityTimeoutSec: 300
    });

    const topic = new sns.Topic(this, 'CloudObserverTopic');

    topic.subscribeQueue(queue);
  }
}

const app = new cdk.App();

new CloudObserverStack(app, 'CloudObserverStack');

app.run();

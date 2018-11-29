#!/usr/bin/env node

import * as path from 'path';
import cdk = require('@aws-cdk/cdk');
import events = require('@aws-cdk/aws-events');
import lambda = require('@aws-cdk/aws-lambda');
import { Topic } from '@aws-cdk/aws-sns';
import { Code, Runtime } from '@aws-cdk/aws-lambda';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';

enum SourceType {
  ECSTaskStateChange = 'ecsTaskStateChange',
}

interface Source {
  type: SourceType;
}

enum DestinationType {
  Slack = 'slack',
  Email = 'email',
}

interface Destination {
  type: DestinationType;
  endpoint: string; // Email when targeting email or URL when targeting Slack
}

interface Subscription {
  sources: Source[];
  destinations: Destination[];
}

const config: Subscription[] = require('../../config');

class CloudObserverStackCore extends cdk.Stack {
  constructor(parent: cdk.App, name: string, props?: cdk.StackProps) {
    super(parent, name, props);

    config.map(this.processSubscription);
  }

  processSource = (source: Source) => {
    switch (source.type) {
      case SourceType.ECSTaskStateChange:
        return new events.EventRule(this, 'ecs-task-state-change', {
          description: 'Runs on ECS Task state change',
          ruleName: 'ecs-task-state-change',
          eventPattern: {
            source: ['aws.ecs'],
            detailType: ['ECS Task State Change'],
          },
        });
    }
  };

  processDestination = (destination: Destination) => {
    switch (destination.type) {
      case DestinationType.Slack:
        return new lambda.Function(this, destination.type, {
          code: Code.asset(path.join(__dirname, '..', 'dispatchers', 'slack')),
          description:
            'CloudObserver Lambda function dispatching Slack messages',
          handler: 'function.handler',
          runtime: Runtime.NodeJS810,
          environment: {
            WEBHOOK_URL: destination.endpoint,
          },
        });
      case DestinationType.Email:
        return new lambda.Function(this, destination.type, {
          code: Code.asset(path.join(__dirname, '..', 'dispatchers', 'email')),
          description: 'CloudObserver Lambda function dispatching Emails',
          handler: 'function.handler',
          runtime: Runtime.NodeJS810,
          environment: {
            EMAIL: destination.endpoint,
          },
        });
    }
  };

  processSubscription = (subscription: Subscription) => {
    const topic = new Topic(this, 'CloudObserverTopic');
    const eventRules = subscription.sources.map(this.processSource);
    const dispatcherFunctions = subscription.destinations.map(
      this.processDestination,
    );

    eventRules.forEach(e => e.addTarget(topic));
    dispatcherFunctions.forEach(f =>
      f.addEventSource(new SnsEventSource(topic)),
    );
  };
}

const app = new cdk.App();

new CloudObserverStackCore(app, 'CloudObserverStack');

app.run();

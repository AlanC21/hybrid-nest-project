import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { configureApp } from './setup';
import serverlessExpress from '@codegenie/serverless-express';
import { APIGatewayProxyResult, Callback, Context, Handler } from 'aws-lambda';
import express from 'express';

let cachedServer: Handler;

async function bootstrapServer(): Promise<Handler> {
  if (!cachedServer) {
    const expressApp = express();

    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    configureApp(nestApp);

    await nestApp.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const server = await bootstrapServer();
  return server(event, context, callback) as Promise<APIGatewayProxyResult>;
};

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  let neo4j = require('neo4j-driver');
    const driver = neo4j.driver(
        'bolt://localhost:7687',
          neo4j.auth.basic('neo4j', 'password')
    );
    const session = driver.session();
    const result = await session.run(
        'MATCH (n) RETURN n LIMIT 25'
    );
    const singleRecord = result.records[0];
    const node = singleRecord.get(0);
    console.log(node.properties);
    await session.close();
    await driver.close();

  const globalPrefix = 'api';
  const port = process.env.PORT || 3334;
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

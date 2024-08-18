#!/usr/bin/env bun

import { Context, Elysia } from 'elysia';
import crypto from 'crypto';
import { logger as loggerPlugin } from "@bogeychan/elysia-logger";
import { staticPlugin } from '@elysiajs/static';
import swaggerPlugin from '@elysiajs/swagger';
import { helmet } from 'elysia-helmet';
import corsPlugin from '@elysiajs/cors';
import { bearer } from '@elysiajs/bearer';
import { rateLimit } from 'elysia-rate-limit';
import { routes } from './routes';
import { validateToken } from './security';


const apiToken = process.env.GPTR_CODE || crypto.randomBytes(32).toString('hex');
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';



console.log('LOG_LEVEL', LOG_LEVEL);

const app = new Elysia()
  .use(corsPlugin())
  .use(bearer())
  // .use(helmet({aot: false}))
  .use(rateLimit({
    duration: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }))
  .use(staticPlugin({
    prefix: "/", headers: {
      'Content-Type': 'application/x-yaml; application/json',
    },
    assets: "./public",
    indexHTML: false
  }))
  .use(
    loggerPlugin({
      level: LOG_LEVEL,
    })
  )
  .use(
    swaggerPlugin({
      documentation: {
        openapi: '3.0.0',
        info: {
          title: 'GPT Remote API',
          version: '1.0.0',
        },
      },
    })
  ).onBeforeHandle(context => {
    validateToken(context, apiToken)
  })
  .onError(async ({ error }) => {
    console.error('--- error', error);
    return { error: error.message };
  })
  .listen({ port: parseInt(process.env.PORT || '3000'), hostname: process.env.HOST || 'localhost' });

routes.forEach(route => {
  app[route.method.toLowerCase()](route.path, route.handler);
});

console.log(`
+----------------------------------------------------------------------+
|                         Authorization Code                           |
+----------------------------------------------------------------------+
|   ${apiToken}   |
+----------------------------------------------------------------------+
`);

console.log(
  '\x1b]8;;https://chatgpt.com/g/g-VmFEDj5jn-mac-overlord\x1b\\Click here to open Mac Overlord CustomGPT\x1b]8;;\x1b\\'
);

process.on('unhandledRejection', (err) => {
  console.error('--- error', err);
  process.exit(1);
});

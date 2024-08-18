// import type { ServerRoute } from '@hapi/hapi';
import { listFilesRoute } from './listFiles';
import { getFileRoute } from './getFile';
import { writeFileRoute } from './writeFile';
import { createDirectoriesRoute } from './createDirectories';
import { healthCheckRoute }from  './healthCheck';
import { focusRoute } from './focus';
import { actionsRoute }from './actions';
import { InternalRoute } from 'elysia';
// import publicRoutes from './public';

export const routes: Partial<InternalRoute>[] = [
  ...actionsRoute,
  listFilesRoute,
  getFileRoute,
  writeFileRoute,
  createDirectoriesRoute,
  healthCheckRoute,
  focusRoute,
];

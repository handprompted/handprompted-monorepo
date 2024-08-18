// import { ServerRoute } from '@hapi/hapi';
// import fs from 'fs';
// import path from 'path';

// export const createDirectoriesRoute: ServerRoute = {
//   method: 'POST',
//   path: '/create-directories',
//   handler: async (request, h) => {
//     const { path: dirPath } = request.payload as { path: string };
//     try {
//       await fs.promises.mkdir(path.resolve(dirPath), { recursive: true });
//       return { message: 'Directory structure created successfully' };
//     } catch (err) {
//       return h.response({ error: err.message }).code(500);
//     }
//   }
// };

import fs from 'fs';
import path from 'path';
import { InternalRoute, t } from 'elysia';

// import { routes } from '../index';

export const createDirectoriesRoute: Partial<InternalRoute> =
{
  method: 'POST',
  path: '/create-directories',
  handler: async (context) => {
    const { path: dirPath } = context.body as { path: string };

    try {
      await fs.promises.mkdir(path.resolve(dirPath), { recursive: true });
      return { message: 'Directory structure created successfully' };
    } catch (err) {
      context.set.status = 500
      return { error: (err as Error).message };
    }
  },
  hooks: {
    body: t.Object({
      path: t.String(), // Validate the body to ensure `path` is a string
    })
  }

}

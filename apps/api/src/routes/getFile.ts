import { InternalRoute, t } from 'elysia';
import fs from 'fs';
import path from 'path';

export const getFileRoute: Partial<InternalRoute> = {
  method: 'POST',
  path: '/get-file',
  handler: async (context) => {
    const { path: filePath } = context.body as { path: string; authCode: string };

    // Implement your authentication logic here based on `authCode`
    // If authentication fails, return a 401 status
    // if (authCode !== process.env.AUTH_CODE) {
    //   context.set.status = 401;
    //   return { error: 'Unauthorized' };
    // }

    try {
      const data = await fs.promises.readFile(path.resolve(filePath), 'utf8');
      return data;
    } catch (err: any) {
      context.set.status = 500;
      return { error: err.message };
    }
  },
  hooks: {
    body: t.Object({
      path: t.String(),
      authCode: t.String(),
    }),
  },
  // description: 'Get the contents of a file.',
  // tags: ['api', 'files'],
};

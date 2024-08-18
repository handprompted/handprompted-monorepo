import { InternalRoute, t } from 'elysia';
import fs from 'node:fs';
import path from 'node:path';

const listFilesRecursively = (dir: string): any[] => {
  let results: any[] = [];
  const list = fs.readdirSync(dir);

  list
    .filter((file) => !['.git', 'node_modules'].includes(path.basename(file)))
    .filter(
      (file) =>
        dir.indexOf('workspace') !== -1 || file.indexOf('workspace') !== -1,
    )
    .forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results.push({
          type: 'directory',
          name: file,
          path: path.relative('.', filePath),
          children: listFilesRecursively(filePath),
        });
      } else {
        results.push({
          type: 'file',
          name: file,
          path: path.relative('.', filePath),
        });
      }
    });

  return results;
};


export const listFilesRoute: Partial<InternalRoute> = {
  method: 'POST',
  path: '/list-files',
  handler: async (context) => {
    console.log(context)
    const { path: dirPath } = context.body as { path: string };

    try {
      const files = listFilesRecursively(path.resolve(dirPath || '.'));
      return files;
    } catch (err: any) {
      console.error(err);
      context.set.status = 500;
      return { error: err.message };
    }
  },

  // hooks: {
  //   body: t.Object({
  //     path: t.String(),  // Validate that path is a required string
  //   }),
  //   description: 'List all files and directories recursively.',
  //   tags: ['api', 'files'],
  // }

}


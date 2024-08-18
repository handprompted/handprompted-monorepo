import fs from 'fs';
import path from 'path';
import { InternalRoute } from 'elysia';

export const writeFileRoute: Partial<InternalRoute> = {
  method: 'POST',
  path: '/write-file',
  handler: async (context) =>{
    const { path: filePath, content } = context.body as { path: string, content: string };
    try {
      const dir = path.dirname(filePath);
      await fs.promises.mkdir(path.resolve(dir), { recursive: true });

      await fs.promises.writeFile(path.resolve(filePath), content, 'utf8');
      return { message: 'File written successfully' };
    } catch (err: any) {
      context.set.status = 500;
      return { error: err.message };
    }
  }
}



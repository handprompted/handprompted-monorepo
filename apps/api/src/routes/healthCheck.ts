import { InternalRoute } from 'elysia';



export const healthCheckRoute:  Partial<InternalRoute> = {
  method: 'GET',
  path: '/health',
  handler: async () => {
    return { status: 'ok' };

  }
}
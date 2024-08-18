import { Context } from "elysia";

export const validateToken = async (ctx: Context, apiToken: string) => {
  const authCode = ctx.request.headers.get('Authorization');
  console.log("auth", authCode)
  console.log("auth", ctx.body)
  if (!authCode) {
    console.log('info', `path>>>> ${ctx.path}`);
    // HACK: bypass validation for specific paths
    if (
      ctx.path === '/' ||
      ctx.path.startsWith('/.well-known') ||
      ctx.path === '/openapi' ||
      (ctx.path === '/actions' && ctx.request.method === 'GET')
    ) {
      return;
    }
    ctx.set.status = 401;
    ctx.body = { error: 'Missing authorization code (authCode payload parameter)' };
    ctx.error(401, 'Missing authorization code (authCode payload parameter)');
    return ctx.set.status = 401
  }

  if (authCode !== apiToken) {
    ctx.set.status = 401;
    ctx.body = { error: 'Invalid authorization code in the authCode payload parameter' };
    ctx.error(401, 'Invalid authorization code in the authCode payload parameter');
    return ctx.set.status = 401
  }

  if (ctx.path && !ctx.path.startsWith('.')) {
    ctx.path = ctx.path.replace(/^[\/\.]*/, './');
  }
  return ctx
  // await next();
};
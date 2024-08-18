import { InternalRoute } from 'elysia';
import { routes } from './index';


export const actionsRoute: Partial<InternalRoute>[] = [
    {
        method: 'GET',
        path: '/actions',
        handler: (context) => {
            try {
                const availableRoutes = routes.map((route) => ({
                    path: route.path,
                    method: route.method,
                    // spec: route.options,
                }));
                return availableRoutes;
            } catch (err: any) {
                return context.error(err, 500);
            }
        }
    },
    {
        method: 'POST',
        path: '/actions/{routeName}',
        handler: (context) => {
            const { routeName } = context.params as { routeName: string };

            const route = routes.find((r) => r.path === `/${routeName}`);

            if (!route || !route.handler) {
                return context.error(404, "Not Found")
                // return context.text('Route not found', 404);
            }

            const response = context.redirect(`/${routeName}`)
            return response
        }
    }]
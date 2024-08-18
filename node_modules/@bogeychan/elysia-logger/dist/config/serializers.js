import { stdSerializers } from 'pino';
export const serializers = {
    request: serializeRequest,
    err: stdSerializers.err
};
export function serializeRequest(request) {
    return {
        method: request.method,
        url: request.url,
        referrer: request.headers.get('Referer')
    };
}

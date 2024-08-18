import { serializeRequest } from "./serializers";
export const formatters = {
    log(object) {
        if (isContext(object)) {
            const log = {
                request: object.request,
            };
            if (object.isError) {
                log.code = object.code;
                log.message = object.error.message;
            }
            else {
                if (object.store.responseTime) {
                    log.responseTime = object.store.responseTime;
                }
            }
            return log;
        }
        else if (isRequest(object)) {
            return serializeRequest(object);
        }
        return object;
    },
};
export function isContext(object) {
    const context = object;
    switch (undefined) {
        case context.request:
        case context.store:
        case context.isError:
            return false;
    }
    return true;
}
export function isRequest(object) {
    const request = object;
    switch (undefined) {
        case request.url:
        case request.method:
            return false;
    }
    return true;
}

import type { RouteSchema } from "elysia";
import type { ElysiaLoggerContext, _INTERNAL_ElysiaLoggerPluginAutoLoggingState } from "../types";
export declare const formatters: {
    log(object: Record<string, unknown>): {
        method: string;
        url: string;
        referrer: string | null;
    } | Record<string, any>;
};
export declare function isContext(object: unknown): object is ElysiaLoggerContext<RouteSchema, {
    request: {};
    store: _INTERNAL_ElysiaLoggerPluginAutoLoggingState;
    derive: {};
    resolve: {};
    decorator: {};
}>;
export declare function isRequest(object: unknown): object is Request;

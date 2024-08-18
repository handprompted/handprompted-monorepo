import { LoggerOptions } from 'pino';
export declare const serializers: LoggerOptions['serializers'];
export declare function serializeRequest(request: Request): {
    method: string;
    url: string;
    referrer: string | null;
};

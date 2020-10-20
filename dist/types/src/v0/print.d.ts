import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { Jobs } from './print/jobs';
import { Messages } from './print/messages';
import { Printers } from './print/printers';
export interface PrintOptions {
    user?: string;
    base?: string;
}
export declare class Print {
    endpoint: string;
    http: Client;
    options: PrintOptions;
    uriHelper: UriHelper;
    constructor(options: PrintOptions, http: Client);
    jobs(): Jobs;
    messages(): Messages;
    printers(): Printers;
    /**
     * Returns an EventSource instance as an endpoint to receive events for the given event name.
     * Subscription state and event handling can be handled via setting `onmessage`, `onopen`, and `onerror` callbacks on the EventSource instance.
     * @param {string} eventName - name of the event to subscribe to (e.g. `jobs`, `messages`, `printers`)
     * @param {Object} [query] - query Record<string, unknown>
     * @returns {EventSource} - event source notifying of server-sent events
     */
    subscribeTo(eventName: string, query?: Record<string, unknown>): EventSource;
}

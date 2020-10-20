import { TillhubClient } from '../src/tillhub-js';
export declare class LocalStorageMock {
    private store;
    clear(): void;
    getItem(key: string): any;
    setItem(key: string, value: string | null): void;
    removeItem(key: string): void;
}
/**
 * Instantiate TillhubClient in the tests - reduce boilerplate
 */
export declare const initThInstance: () => Promise<TillhubClient>;

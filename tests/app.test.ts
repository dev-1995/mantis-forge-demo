import { describe, it, expect, beforeEach } from 'vitest';
import App from '../src/app';
import { FrameworkOptions } from '../src/types';

describe('App', () => {
    let app: App;

    beforeEach(() => {
        const options: FrameworkOptions = {
            config: {
                testConfig: 'test',
            },
        };
        app = new App(options);
    });

    it('should create an instance of App', () => {
        expect(app).toBeInstanceOf(App);
    });

    it('should have a registerPlugin method', () => {
        expect(app.registerPlugin).toBeInstanceOf(Function);
    });

    it('should have a start method', () => {
        expect(app.start).toBeInstanceOf(Function);
    });
});

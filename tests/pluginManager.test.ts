import { describe, it, expect, beforeEach } from 'vitest';
import PluginManager from '../src/pluginManager';
import { Plugin } from '../src/types';

describe('PluginManager', () => {
    let pluginManager: PluginManager;

    beforeEach(() => {
        pluginManager = new PluginManager();
    });

    it('should register a plugin', () => {
        const mockPlugin: Plugin = {
            name: 'mockPlugin',
            prefix: '/mock',
            register: () => { },
        };

        pluginManager.registerPlugin(mockPlugin);
        expect(pluginManager['plugins']).toHaveLength(1);
        expect(pluginManager['plugins'][0]).toBe(mockPlugin);
    });

    it('should throw an error when registering a plugin with a duplicate prefix', () => {
        const mockPlugin1: Plugin = {
            name: 'mockPlugin1',
            prefix: '/mock',
            register: () => { },
        };

        const mockPlugin2: Plugin = {
            name: 'mockPlugin2',
            prefix: '/mock',
            register: () => { },
        };

        pluginManager.registerPlugin(mockPlugin1);
        expect(() => pluginManager.registerPlugin(mockPlugin2)).toThrow();
    });
});

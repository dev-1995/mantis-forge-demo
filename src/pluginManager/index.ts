import { Router } from 'express';
import { Plugin, FrameworkConfig, FrameworkEnv } from '../types';
import PluginRouter from '../router';
import logger from '../logger';

class PluginManager {
    private plugins: Plugin[];
    private router: PluginRouter;

    constructor() {
        this.plugins = [];
        this.router = new PluginRouter();
    }

    registerPlugin(plugin: Plugin) {
        this.plugins.push(plugin);
        this.router.registerPlugin(plugin);
    }

    initializePlugins(mantisRouter: Router, config: FrameworkConfig, env: FrameworkEnv) {
        this.plugins.forEach((plugin) => {
            plugin.register(mantisRouter, config, env, logger);
        });
        mantisRouter.use(this.router.getRouter());
    }

    getRouter() {
        return this.router.getRouter();
    }
}

export default PluginManager;

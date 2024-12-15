import express, { Router } from 'express';
import { FrameworkOptions, FrameworkEnv } from './types';
import config from './config';
import logger from './logger';
import db from './database';
import { errorHandler } from './errorHandler';
import PluginManager from './pluginManager';

class MantisForge {
    private pluginManager: PluginManager;

    constructor(private app: express.Express, private mantisRouter: Router, options: FrameworkOptions) {
        this.pluginManager = new PluginManager();

        this.app.locals.config = { ...config, ...options.config };
        this.app.locals.env = {
            db,
            logger,
        } as FrameworkEnv;

        this.setupMiddleware();
    }

    private setupMiddleware() {
        this.app.use('/mantis', this.mantisRouter);
        this.app.use(errorHandler);
    }

    public registerPlugin(plugin: any) {
        this.pluginManager.registerPlugin(plugin);
    }

    public initialize() {
        this.pluginManager.initializePlugins(this.mantisRouter, this.app.locals.config, this.app.locals.env);
        logger.info('Mantis framework initialized');
    }
}

export default MantisForge;

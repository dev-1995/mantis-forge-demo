import express, { Router } from 'express';
import { FrameworkOptions } from './types';
declare class MantisForge {
    private app;
    private mantisRouter;
    private pluginManager;
    constructor(app: express.Express, mantisRouter: Router, options: FrameworkOptions);
    private setupMiddleware;
    registerPlugin(plugin: any): void;
    initialize(): void;
}
export default MantisForge;

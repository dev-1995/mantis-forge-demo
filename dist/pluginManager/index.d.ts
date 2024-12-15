import { Router } from 'express';
import { Plugin, FrameworkConfig, FrameworkEnv } from '../types';
declare class PluginManager {
    private plugins;
    private router;
    constructor();
    registerPlugin(plugin: Plugin): void;
    initializePlugins(mantisRouter: Router, config: FrameworkConfig, env: FrameworkEnv): void;
    getRouter(): Router;
}
export default PluginManager;

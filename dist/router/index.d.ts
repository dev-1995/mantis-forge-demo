import { Router } from 'express';
import { Plugin } from '../types';
declare class PluginRouter {
    private router;
    private prefixes;
    constructor();
    registerPlugin(plugin: Plugin): void;
    getRouter(): Router;
}
export default PluginRouter;

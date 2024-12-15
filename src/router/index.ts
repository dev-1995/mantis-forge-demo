import { Router, Request, Response, NextFunction, Express } from 'express';
import { Plugin } from '../types';

class PluginRouter {
    private router: Router;
    private prefixes: Set<string>;

    constructor() {
        this.router = Router();
        this.prefixes = new Set();
    }

    registerPlugin(plugin: Plugin) {
        if (this.prefixes.has(plugin.prefix)) {
            throw new Error(`Plugin prefix "${plugin.prefix}" is already in use`);
        }

        this.prefixes.add(plugin.prefix);
        this.router.use(plugin.prefix, (req: Request, _res: Response, next: NextFunction) => {
            plugin.register(req.app as Express, req.app.locals.config, req.app.locals.env);
            next();
        });
    }

    getRouter() {
        return this.router;
    }
}

export default PluginRouter;

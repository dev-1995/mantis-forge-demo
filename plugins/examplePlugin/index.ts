import { Router } from 'express';
import { Plugin, FrameworkConfig, FrameworkEnv } from '../../src/types';
import routes from './routes';
import { ExamplePluginConfig } from './types';

const examplePlugin: Plugin = {
    name: 'examplePlugin',
    prefix: '/example',
    register: (app, config: FrameworkConfig, env: FrameworkEnv) => {
        const router = Router();
        const pluginConfig: ExamplePluginConfig = {
            greeting: config.examplePluginGreeting || 'Hello',
        };
        const pluginRoutes = routes(pluginConfig);

        router.get('/greeting', pluginRoutes.getGreeting);

        app.use(examplePlugin.prefix, router);
    },
};

export default examplePlugin;

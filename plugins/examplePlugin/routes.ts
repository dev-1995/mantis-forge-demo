import { Request, Response } from 'express';
import { ExamplePluginRoutes, ExamplePluginConfig } from './types';

export default (config: ExamplePluginConfig): ExamplePluginRoutes => ({
    getGreeting: (req: Request, res: Response) => {
        res.json({ message: `${config.greeting}, World!` });
    },
});

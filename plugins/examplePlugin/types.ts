import { Request, Response } from 'express';

export interface ExamplePluginConfig {
    greeting: string;
}

export interface ExamplePluginRoutes {
    getGreeting: (req: Request, res: Response) => void;
}

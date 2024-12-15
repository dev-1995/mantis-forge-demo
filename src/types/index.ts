import { Router } from 'express';
import { Logger } from 'winston';
import { Pool } from 'pg';

export interface Plugin {
    name: string;
    prefix: string;
    register: (router: Router, config: FrameworkConfig, env: FrameworkEnv, logger: Logger) => void;
}

export interface FrameworkConfig {
    [key: string]: any;
}

export interface FrameworkEnv {
    db: Pool;
    logger: Logger;
}

export interface FrameworkOptions {
    config: FrameworkConfig;
}

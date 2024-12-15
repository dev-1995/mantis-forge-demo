import PG from 'pg';
import config from '../config';

const pool = new PG.Pool(config.database);

export default pool;

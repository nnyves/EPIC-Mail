import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const connection = new Pool(
  { connectionString: process.env.CONNECTIONSTRING || process.env.DATABASE_URL },
);
export default connection;

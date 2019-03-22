import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const connection = new Pool(
  { connectionString: process.env.CONNECTIONSTRING || process.env.CONNECTION_URL },
);
export default connection;

import Express from 'express';
import bodyParser from 'body-parser';
import serverConfig from './config/server.config';
import authRoute from './routes/auth.route';

const { portNumber, version } = serverConfig;
const app = new Express();
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(`/api/${version}/auth`, authRoute);
app.listen(portNumber);
console.log(`Server started on port ${portNumber}`);
export default app;

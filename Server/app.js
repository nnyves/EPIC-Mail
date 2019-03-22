import Express from 'express';
import bodyParser from 'body-parser';
import serverConfig from './config/server.config';
import authRoute from './routes/auth.route';
import messageRoute from './routes/message.route';
import groupRoute from './routes/group.route';
import authMiddleware from './middlewares/auth.middleware';

const { portNumber } = serverConfig;
const app = new Express();
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/messages', authMiddleware);
app.use('/api/v1/messages', messageRoute);
app.use('/api/v1/group', authMiddleware);
app.use('/api/v1/group', groupRoute);
app.listen(portNumber);
console.log(`Server started on port ${portNumber}`);
export default app;

import express from 'express';
import * as http from 'http';
import * as bodyparser from 'body-parser';

import {CommonRoutesConfig} from './common/common.routes.config';
import {UsersRoutes} from './users/users.routes.config';
import { AuthRoutes } from './auth/auth.routes.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = 3000;
const routes: any = [];

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); // support encoded bodies

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    } else {
        return next();
    }
});

routes.push(new UsersRoutes(app));
routes.push(new AuthRoutes(app));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at port ${port}`)
});

server.listen(port, () => {
    console.log(`Server running at port ${port}`);
    routes.forEach((route: CommonRoutesConfig) => {
        console.log(`Routes configured for ${route.getName()}`);
    });
});

export default app;
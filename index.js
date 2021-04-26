const config = require('./common/config/env.config.js');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


const AuthorizationRouter = require('./authorization/routes.config');
const userRouter = require('./users/routes.config');
const contactRouter = require('./contact/routes.config');
const documentRouter = require('./document/routes.config');
const enterpriseRouter = require('./enterprise/routes.config');
const saleRouter = require('./sale/routes.config');

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, enterpriseId, userId');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());
AuthorizationRouter.routesConfig(app);
userRouter.routesConfig(app);
contactRouter.routesConfig(app);
documentRouter.routesConfig(app);
enterpriseRouter.routesConfig(app);
saleRouter.routesConfig(app);

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});

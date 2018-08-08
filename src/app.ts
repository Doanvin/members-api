import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as statusControl from './controllers/status';
require('dotenv').config();

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', process.env.SFTHCC_PORT || 8082);
app.set('env', process.env.NODE_ENV);

app.get('/api/members/full-name', statusControl.membersFullName);
app.get('/api/members/first-name', statusControl.membersFirstName);
app.put('/api/members/update-address', statusControl.membersUpdateAddress);

export default app;

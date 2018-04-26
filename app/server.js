import fs from "fs";
import express from "express";
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import * as webpackHelper from "./server/helpers/webpackHelper";
import {HTTPError} from "./server/helpers/utils";

const app = express();
const hbs = expressHandlebars.create({});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: "10mb"}));

if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...');
    webpackHelper.useWebpackMiddleware(app)
} else {
    console.log('PRODUCTION ENVIRONMENT');
    app.use('/client.bundle.js', express.static('client.bundle.js'));
    app.use('/style.bundle.css', express.static('style.bundle.css'));
}

app.use('/static', express.static('static'));

app.use(require('./server/helpers/reactHelper').reactMiddleware);

app.use('/', require("./server/routes/index").router);

app.use((req, res, next) => {
    next(HTTPError(404, "Not Found"));
});

app.use((err, req, res, next) => {
    const initialData = {};

    console.error(err);

    const status = err.status || 500;

    initialData._error = {
        status,
        message: err.message || "Internal Server Error",
        stack: err.stack,
    };

    res.status(status);
    res.react(initialData);
});

let port = JSON.parse(fs.readFileSync("package.json")).port || 3000;
if(process.env.DOCKERIZED) port = 80;
app.listen(port);
console.log(`Listening on port ${port}`);
import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import React from 'react';
import {renderToString} from 'react-dom/server';
import settings from '../config/settings';
import App from './js/App';

const port = settings.webpack.server.port;
const host = settings.env.hostname;
const app = express();

app.use(cors());
app.use(express.static(settings.dist.path));

app.get('*', (req, res, next) => {
    const indexPath = path.resolve(settings.src.path, settings.src.index);
    const markup = renderToString(
        <App />
    );

    fs.readFile(indexPath, 'utf8', (error, htmlTemplate) => {
        if (error) {
            console.error('Error loading HTML:', error); // eslint-disable-line no-console

            return res.status(404).end();
        }

        return res.send(
            htmlTemplate.replace('<div class="root"></div>', `<div class="root">${markup}</div>`)
        );
    });
});

app.listen(port, host, error => {
    /* eslint-disable no-console */
    if (error) {
        return console.log('SSR Error:', error);
    }

    console.log(`Server-side-rendering activated and listening at ${host}:${port}...`);
    /* eslint-enable no-console */
});

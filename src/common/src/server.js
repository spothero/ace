import fs from 'fs';
import path from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './js/App';

const serverRenderer = ({settings}) => {
    return (req, res, next) => {
        const manifestPath = path.resolve(settings.dist.path, settings.dist.manifest.filename);
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        const markup = renderToString(
            <App />
        );

        res.send(`
            <!doctype html>
            <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <meta http-equiv="x-ua-compatible" content="ie=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1">

                    <title>Project Title</title>

                    <link rel="stylesheet" href="/${manifest['css/main.css']}">
                </head>
                <body>
                    <div class="root">${markup}</div>
                    <script src="/${manifest['js/main.js']}"></script>
                </body>
            </html>
        `);
    };
};

export default serverRenderer;

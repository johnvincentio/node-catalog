/* jshint node: true */
/* jshint esnext: true */

'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();

// const blogRouter = require('./blogRouter');

app.use(morgan('common'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/content', (req, res) => {
    res.sendFile(__dirname + '/views/content.html');
});

app.get('/lighting', (req, res) => {
    res.sendFile(__dirname + '/views/lighting.html');
});

// app.use('/blog', blogRouter);

let server;

function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        }).on('error', err => {
            reject(err);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                reject(err);
                // so we don't also call `resolve()`
                return;
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};

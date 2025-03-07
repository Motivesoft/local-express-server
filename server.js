const express = require('express');
const path = require('path');
const yargs = require('yargs');

// Redirect logging
const { logClient, logLog, logError, logWarn, logInfo, logDebug } = require('./logger');
console.log = (...args) => { logLog(args); };
console.error = (...args) => { logError(args); };
console.warn = (...args) => { logWarn(args); };
console.info = (...args) => { logInfo(args); };
console.debug = (...args) => { logDebug(args); };

// Parse command line arguments
const argv = yargs
    .option('port', {
        alias: 'p',
        description: 'Port to run the server on',
        type: 'number',
        default: 3000
    })
    .option('dir', {
        alias: 'd',
        description: 'Directory of static files to serve',
        type: 'string',
        default: 'public'
    })
    .help()
    .alias('help', 'h')
    .argv;

const app = express();

// Use command line arguments and defaults to erve static files from 'dir' using 'port'
// 'dir' might be absolute or relative, defaulting to './public'
// 'port' will default to 3000
const STATIC_DIR = path.isAbsolute(argv.dir) ? argv.dir : path.join(__dirname, argv.dir);
const PORT = argv.port;

// Configure the server
app.use(express.json());
app.use(express.static(STATIC_DIR));

// Endpoint to handle log data from the client
app.post('/log', (req, res) => {
    const logData = req.body;

    try {
        const ipAddress = req.ip.replace(/^.*:/, '');
        logClient(logData.type, logData.message, ipAddress);
        res.status(200).json({status: 'Log received'});
    } catch(error) {
        return res.status(500).send(`Failed to save log: ${error.message}`);
    }
});

// Start the server
app.listen(PORT).on('listening', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Serving static files from: ${STATIC_DIR}`);
}).on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('An unexpected error occurred:', error);
    }
});

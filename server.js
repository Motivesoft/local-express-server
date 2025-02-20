const express = require('express');
const path = require('path');
const yargs = require('yargs');

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

// Start the server
app.use(express.static(STATIC_DIR));
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

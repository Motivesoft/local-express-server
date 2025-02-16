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
const PORT = argv.port;
const STATIC_DIR = argv.dir;

// Serve static files
app.use(express.static(path.join(__dirname, STATIC_DIR)));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Serving static files from: ${path.join(__dirname, STATIC_DIR)}`);
});

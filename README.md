# local-express-server
Web server (node+express) for testing that runs locally and serves static content from the local filesystem.

Deliberately simple for ease.

## Usage
```shell
node server.js --port 3000 --dir <path-to-html-files>
```

## Logging
Server now has an endpoint to allow clients to use console.log etc but have it routed to the server.
This is useful for clients that don't offer access to their browser consoles or just for viewing logging more conveniently.

Another bonus that that all server logging and logging from all clients will be collated centrally. 

If the server is running under PM2, this also retains the log files.

To enable this logging, include "logging.js" from the "public" folder into the web pages in question.

See the "index.html" page in "public" for example usage.

> IMPORTANT: This is to aid testing only. It is not intended for public-facing websites.

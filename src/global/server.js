var debug = require('debug')('http')
    , http = require('http')
    , name = 'My App';
var path = require('path');
var express = require('express');
var react = require('react');
var http = require('http');
var url = require('url');

var app = express();
var port = normalizePort(process.env.PORT || '8080');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.get("*", function (request, response) {
    // var application = require("../../build/js/app.js");
    //  var n = require("./components/container/application.js");
    var uri = url.format({
        protocol: request.protocol,
        host: request.get('host'),
        pathname: request.originalUrl
    });
    console.info("baseUrl: " + JSON.stringify(uri));
    // log("baseUrl: " + JSON.stringify(request.baseUrl));
    //  debug("FLORIAN");
    //  debug("wsedfwef ");
    //  let markup = renderToString(<Application />);
    let markup = uri;
    return response.render("index", { markup });
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    // var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

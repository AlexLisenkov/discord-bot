"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const url = require("url");
const Config_1 = require("../Config/Config");
const Client_1 = require("../ActiveConnection/Client");
/// <reference path="../json-type.d.ts"/>
const updateLog = require("../../updateLog.json");
class HTTPServer {
    /**
     * Construct a stream
     */
    constructor() {
        // An empty void, nothing can fill this gap
    }
    static get instance() {
        if (HTTPServer._instanciated)
            return null;
        HTTPServer.server = http.createServer((request, response) => {
            request.setEncoding('utf8');
            request.on('data', (chunk) => {
                response.statusCode = 404;
                response.end();
            });
            request.on('end', () => {
                const queryString = url.parse(request.url, true);
                if (!queryString.query.password || queryString.query.password !== Config_1.default.secret) {
                    response.statusCode = 403;
                    response.end('Unauthenticated');
                }
                if (queryString.pathname === '/sendMessage') {
                    Client_1.default.sendMessageToAllGuilds(queryString.query.message);
                    response.statusCode = 200;
                    response.end('OK');
                }
                if (queryString.pathname === '/sendEmbed') {
                    Client_1.default.sendEmbedToAllGuilds(JSON.parse(queryString.query.embed).embed);
                    response.statusCode = 200;
                    response.end('OK');
                }
                if (queryString.pathname === '/sendUpdateMessage') {
                    Client_1.default.sendEmbedToAllGuilds(updateLog);
                    response.statusCode = 200;
                    response.end('OK');
                }
                if (queryString.pathname === '/disconnectEveryone') {
                    Client_1.default.disconnectEveryone();
                    response.statusCode = 200;
                    response.end('OK');
                }
                response.statusCode = 404;
                response.end('Not found');
                response.end();
            });
            setTimeout(() => response.end(), 1000);
        });
        HTTPServer.server.listen(Config_1.default.http_port);
        HTTPServer._instanciated = true;
    }
}
HTTPServer._instanciated = false;
exports.default = HTTPServer;
//# sourceMappingURL=HTTPServer.js.map
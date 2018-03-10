import * as http from "http";
import * as url from "url";
import Config from "../Config/Config";
import Client from "../ActiveConnection/Client";
/// <reference path="../json-type.d.ts"/>
import * as updateLog from "../../updateLog.json";

export default class HTTPServer
{
    private static _instanciated: boolean = false;
    public static server: http.Server;

    public static get instance():void {
        if( HTTPServer._instanciated )
            return null;

        HTTPServer.server = http.createServer( (request: http.IncomingMessage, response: http.ServerResponse) => {
            request.setEncoding('utf8');
            request.on('data', (chunk) => {
                response.statusCode = 404;
                response.end();
            });
            request.on('end', () => {
                const queryString = url.parse(request.url, true);
                if( !queryString.query.password || queryString.query.password !== Config.secret ){
                    response.statusCode = 403;
                    response.end('Unauthenticated');
                }

                if( queryString.pathname === '/sendMessage' ) {
                    Client.sendMessageToAllGuilds(queryString.query.message);
                    response.statusCode = 200;
                    response.end('OK');
                }
                if( queryString.pathname === '/sendEmbed' ) {
                    Client.sendEmbedToAllGuilds(JSON.parse(<string>queryString.query.embed).embed);
                    response.statusCode = 200;
                    response.end('OK');
                }

                if( queryString.pathname === '/sendUpdateMessage' ) {
                    Client.sendEmbedToAllGuilds(updateLog);
                    response.statusCode = 200;
                    response.end('OK');
                }

                response.statusCode = 404;
                response.end('Not found');
                response.end();
            });
            setTimeout(() => response.end(), 1000);
        });
        HTTPServer.server.listen(Config.http_port);
        HTTPServer._instanciated = true;
    }

    /**
     * Construct a stream
     */
    private constructor( ){
        // An empty void, nothing can fill this gap
    }
}
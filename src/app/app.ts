import express from "express";
import config from "../config.js";
import { Server } from "node:http";
import setRouters from "./routers/setRouters.js";
import { IDisposable } from "../types/disposable";
import { httpLogger } from "./middlewares/logger.js";
import { httpServerLogger } from "../helpers/logger.js";
import { errorRequestHandler, notFoundHandler } from "./errorHandlers.js";

export class ExpressApplication implements IDisposable {
    #app: express.Application = express();
    #server?: Server;

    initServer() {
        if (this.#server) return this.#server;

        if (config.api.trustProxy)
            this.#app.set('trust proxy', 'loopback');

        this.#app.disable("x-powered-by");
        this.#app.use(httpLogger);

        if (config.isDevelopment) {
            this.#app.use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', '*');
                res.setHeader('Access-Control-Allow-Methods', '*');
                next();
            });
        }

        setRouters(this.#app);

        this.#app.set('view engine', 'ejs');
        this.#app.set('views', './client/views');
        this.#app.set("layout", './layout');
        this.#app.set("layout extractStyles", true);
        this.#app.set("layout extractScripts", true);

        this.#app.use("/static", express.static("./client/public"));
        this.#app.use(notFoundHandler);
        this.#app.use(errorRequestHandler);

        this.#server = this.#app.listen(config.api.port);
        this.#server.once("listening", () => {
            httpServerLogger.info(`Express listening on http://127.0.0.1:${config.api.port}`);
        });

        return this.#server;
    }

    dispose(): Promise<void> {
        return this.shutdown();
    }

    shutdown() {
        return new Promise<void>(resolve => {
            const server = this.#server;
            if (!server) return;

            server.once("close", () => {
                httpServerLogger.info("✅ REST API server closed.");
                this.#server = undefined;
                resolve();
            });

            httpServerLogger.info("Closing REST API server...");
            server.close();
        });
    }
}

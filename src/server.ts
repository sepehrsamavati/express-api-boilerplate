import process from "node:process";
import ExitHelper from "./helpers/exitHelper.js";
import { ExpressApplication } from "./app/ExpressApplication.js";

const server = new ExpressApplication();

server.initServer();


const exitHelper = new ExitHelper(process, {
    disposables: [server]
});

exitHelper.bindExitHandler();

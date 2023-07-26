import { logger } from "./logger.js";
import { IDisposable } from "../types/disposable";

type Disposables = {
    disposables: IDisposable[];
};

export default class ExitHelper {
    #process: NodeJS.Process;
    #disposables;

    #sigintCalls = 0;
    #bound = false;
    static readonly forceShutdownCalls = 3;

    constructor(p: NodeJS.Process, disposables: Disposables = { disposables: [] }) {
        this.#process = p;
        this.#disposables = disposables.disposables;
    }

    async #cleanup(timeout = 0) {
        let timer: NodeJS.Timeout | null = null;
        if (timeout) timer = setTimeout(() => {
            logger.info("Connection cleanup timeout! Force shutdown...");
            this.#process.exit(1);
        }, timeout).unref();

        await Promise.all(this.#disposables.map(d => d.dispose()));

        if (timer)
            clearTimeout(timer);

        return;
    }

    async shutdown(reason: string | number, mute = false) {
        if (!mute)
            logger.error("🔴 Exiting application, " + (typeof reason === "number" ? `exit code: ${reason}` : `reason: '${reason}'`));
        await this.#cleanup(10000);
        this.#process.exit(typeof reason === "number" ? reason : 1);
    };

    bindExitHandler() {
        if (this.#bound) return;

        this.#process.on("SIGINT", async () => {
            this.#sigintCalls++;

            if (this.#sigintCalls === 1) {
                logger.info("Shutting down...");
                await this.#cleanup();
                this.#process.exit(0);
            }
            else
                console.log(`Force shutdown ${this.#sigintCalls - 1}/${ExitHelper.forceShutdownCalls}`);

            if (this.#sigintCalls > ExitHelper.forceShutdownCalls) this.#process.exit();
        });

        this.#process.once("beforeExit", (exitCode: number) => {
            this.shutdown(exitCode, true);
            logger.info(`Exit code: ${exitCode}`);
        });

        this.#process.once("uncaughtException", (err: Error) => {
            console.error(err);
            logger.error(err);
            this.shutdown(err.message);
        });
    }
}
import { ExitCode } from "../enums/exitCodes.js";

export default class ConfigError {
    constructor(message: string) {
        console.error(`Config error\n${message}`);
        process.exit(ExitCode.ConfigError);
    }
}

export * from "./mongoDB"
export * from "./TYPES"

const logOptions: LogConfig = {
    debugToConsole: true,
    errorToConsole: true,
    infoToConsole: true,
    traceToConsole: true,
    warnToConsole: true,
    logFile: "./log.txt",
}

sharedContainer.bind<Logger>(SHARED_TYPES.logger).to(FileAndConsoleLogger)
sharedContainer.bind<LogConfig>(SHARED_TYPES.logConfig).toConstantValue(logOptions)

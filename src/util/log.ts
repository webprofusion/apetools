export interface ILogger {
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
}

export class Logger implements ILogger {

    info(msg: string): void {
        console.info(msg);
    }

    warn(msg: string): void {
        console.warn(msg);
    }

    error(msg: string): void {
        console.error(msg);
    }

}

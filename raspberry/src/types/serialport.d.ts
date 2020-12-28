declare module '@serialport/binding-abstract' {
    export interface PortInfo {
        path: string;
        manufacturer?: string;
        serialNumber?: string;
        pnpId?: string;
        locationId?: string;
        productId?: string;
        vendorId?: string;
    }

    export interface OpenOptions {
        autoOpen?: boolean;
        baudRate?: BaudRate;
        dataBits?: 8 | 7 | 6 | 5;
        highWaterMark?: number;
        lock?: boolean;
        stopBits?: 1 | 2;
        parity?: 'none' | 'even' | 'mark' | 'odd' | 'space';
        rtscts?: boolean;
        xon?: boolean;
        xoff?: boolean;
        xany?: boolean;
        binding?: BaseBinding;
        bindingOptions?: {
            vmin?: number;
            vtime?: number;
        };
    }

    export interface UpdateOptions {
        baudRate?: BaudRate;
    }

    export interface SetOptions {
        brk?: boolean;
        cts?: boolean;
        dsr?: boolean;
        dtr?: boolean;
        rts?: boolean;
    }

    export type BaudRate =
        115200
        | 57600
        | 38400
        | 19200
        | 9600
        | 4800
        | 2400
        | 1800
        | 1200
        | 600
        | 300
        | 200
        | 150
        | 134
        | 110
        | 75
        | 50
        | number;

    export default abstract class AbstractBinding {
        static list(): Promise<PortInfo[]>;

        open(path: string, options: OpenOptions): Promise<void>;

        close(): Promise<void>;

        read(buffer: Buffer, offset: number, length: number): Promise<{ bytesRead: number, buffer: Buffer }>;

        write(buffer: Buffer): Promise<void>;

        update(options: UpdateOptions): Promise<void>;

        set(options: SetOptions): Promise<void>;

        getBaudRate(): Promise<BaudRate>;

        flush(): Promise<void>;

        drain(): Promise<void>;
    }
}

declare module '@serialport/bindings' {
    import AbstractBinding from '@serialport/binding-abstract';

    export default class BaseBinding extends AbstractBinding {
        constructor(options: any);
    }
}

declare module '@serialport/binding-mock' {
    import AbstractBinding from '@serialport/binding-abstract';

    export interface CreatePortOptions {
        echo?: boolean,
        record?: boolean,
        readyData?: Buffer
    }

    export class MockBinding extends AbstractBinding {
        static createPort(path: string, options?: CreatePortOptions): void;

        static reset(): void;

        readonly recording: Buffer;
        readonly lastWrite: null | Buffer;

        constructor(options: any);

        emitData(data: Buffer | string | number[]): void;
    }
}

declare module '@serialport/parser-delimiter' {
    import {Transform} from 'stream';

    export interface DelimiterParserConstructorOptions {
        delimiter: string | Buffer | number[],
        includeDelimiter?: boolean
    }

    export default class DelimiterParser extends Transform {
        constructor(options: DelimiterParserConstructorOptions);
    }
}

declare module '@serialport/parser-readline' {
    import DelimiterParser, {DelimiterParserConstructorOptions} from '@serialport/parser-delimiter';

    export interface ReadLineParserConstructorOptions extends DelimiterParserConstructorOptions {
        encoding?: string
    }

    export default class ReadLineParser extends DelimiterParser {
        constructor(options?: ReadLineParserConstructorOptions);
    }
}

declare module '@serialport/stream' {
    import * as Stream from 'stream';
    import {PortInfo, OpenOptions} from '@serialport/binding-abstract';

    export type ErrorCallback = (error?: Error | null) => void;
    export type ModemBitsCallback = (error: Error | null | undefined, status: { cts: boolean, dsr: boolean, dcd: boolean }) => void;

    export default class Serialport extends Stream.Duplex {
        static Binding: BaseBinding;

        static list(): Promise<PortInfo[]>;

        readonly baudRate: number;
        readonly binding: BaseBinding;
        readonly isOpen: boolean;
        readonly path: string;

        constructor(path: string, callback?: ErrorCallback);
        constructor(path: string, options?: OpenOptions, callback?: ErrorCallback);

        open(callback?: ErrorCallback): void;

        update(options: UpdateOptions, callback?: ErrorCallback): void;

        write(data: string | number[] | Buffer, callback?: (error: Error | null | undefined, bytesWritten: number) => void): boolean;
        write(buffer: string | number[] | Buffer, encoding?: 'ascii' | 'utf8' | 'utf16le' | 'ucs2' | 'base64' | 'binary' | 'hex', callback?: (error: Error | null | undefined, bytesWritten: number) => void): boolean;

        read(size?: number): string | Buffer | null;

        close(callback?: (error?: Error | null) => void): void;

        set(options: SetOptions, callback?: ErrorCallback): void;

        get(callback?: ModemBitsCallback): void;

        flush(callback?: ErrorCallback): void;

        drain(callback?: SerialPort.ErrorCallback): void;

        pause(): this;

        resume(): this;

        on(event: string, callback: (data?: any) => void): this;
    }
}

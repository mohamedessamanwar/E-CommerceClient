export interface Response<T> {
    statusCode: number;
    meta?: any;
    succeeded: boolean;
    message?: string;
    errors?: string[];
    errorsDic?: { [key: string]: string[] };
    data?: T;
}

import pgPromise, { IDatabase, IInitOptions, IMain } from "pg-promise";
import config from "../../config/config";
import { IClient } from "pg-promise/typescript/pg-subset";

const connection = {
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PWD,
    port: config.DB_PORT as number,
    max: 30,
    idleTimeoutMillis: 30000
};

const initOptions: IInitOptions = {

}

export const pgp: IMain = pgPromise(initOptions);

export const db: IDatabase<IClient> = pgp(connection)


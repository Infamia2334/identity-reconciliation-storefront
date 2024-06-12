import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.resolve(__dirname, '../../.env')
});

console.log(process.env.NODE_ENV);

export default {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT: process.env.NODE_ENV === 'test' ? 3005 : process.env.PORT || 8000,
    DB_USER: process.env.DB_USER || '',
    DB_HOST: process.env.DB_HOST || '',
    DB_NAME: process.env.DB_NAME || '',
    DB_PWD: process.env.DB_PWD || '',
    DB_PORT: process.env.DB_PORT || 5432,
}
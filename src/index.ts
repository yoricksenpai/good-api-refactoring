import "reflect-metadata";
import { ExpressLoader } from './loader/express';
import { startDatabase } from './database/mongodb';
import { logger } from './winston-config';
import { Container } from 'typedi';


startDatabase().then(async () => {
    logger.info("Database connection successful");
    new ExpressLoader();
}).catch((err: Error) => {
    console.error(err.stack);
    logger.error("Database connection failed \n", err.stack || '');
});
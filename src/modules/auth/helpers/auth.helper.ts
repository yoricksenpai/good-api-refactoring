import moment from "moment";
import jwt from 'jsonwebtoken';
import { Token } from "../models";
import { config } from '../../../convict-config';

export const create = (payload: any): Token => {
    const issued = getCurrDateSeconds();
    const options = { expiresIn: config.get('jwt.tokenExpiration') };
    const tokenSalt = config.get('jwt.tokenSalt');

    if (!tokenSalt) {
        throw new Error("JWT token salt is missing");
    }

    const access_token = jwt.sign(payload, tokenSalt, options);
    const refresh_token = jwt.sign(payload, config.get('jwt.refreshTokenSalt'), { expiresIn: config.get('jwt.refreshTokenExpiration') });

    return { access_token, refresh_token, token_type: 'Bearer', issued, expires_in: issued + parseInt(config.get('jwt.tokenExpiration'), 10) };
};


export const refresh = (token: string): any => {
    const payload: any = jwt.verify(token, `${config.get('jwt.tokenSalt')}`);
    delete payload.iat;
    delete payload.exp;
    delete payload.nbf;

    const options = { expiresIn: config.get('jwt.refreshTokenExpiration') };

    return jwt.sign({ payload }, `${config.get('jwt.tokenSalt')}`, options);
}

const getCurrDateSeconds = (): number => {
    return moment().valueOf() / 1000 | 0;
}
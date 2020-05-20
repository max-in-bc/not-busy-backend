import express from 'express';
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
// TODO: move to an env variable for production
const jwt_secret = 'My!@!Se3cr8tH4sh';
const tokenExpirationInSeconds = 3600;
export class AuthController {
    constructor() {
    }
    async createJWT(req: express.Request, res: express.Response) {
        try {
            let refreshId = req.body.userId + jwt_secret;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body.refreshKey = salt;
            let token = jwt.sign(req.body, jwt_secret, { expiresIn: tokenExpirationInSeconds });
            let b = Buffer.from(hash);
            let refreshToken = b.toString('base64');
            return res.status(201).send({ accessToken: token, refreshToken: refreshToken, userId: req.body.userId });
        } catch (err) {
            return res.status(500).send(err);
        }
    }
}
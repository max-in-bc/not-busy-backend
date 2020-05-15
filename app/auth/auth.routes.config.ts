import { CommonRoutesConfig, configureRoutes } from '../common/common.routes.config';
import { AuthController } from './controllers/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import express from 'express';
export class AuthRoutes extends CommonRoutesConfig implements configureRoutes {
    constructor(app: express.Application) {
        super(app, 'AuthRoute');
        this.configureRoutes();
    }
    configureRoutes() {
        const authController = new AuthController();
        const authMiddleware = AuthMiddleware.getInstance();
        const jwtMiddleware = JwtMiddleware.getInstance();
        this.app.post(`/auth`, [
            authMiddleware.validateBodyRequest,
            authMiddleware.verifyUserPassword,
            authController.createJWT
        ]);
        this.app.post(`/auth/refresh-token`, [
            jwtMiddleware.validJWTNeeded,
            jwtMiddleware.verifyRefreshBodyField,
            jwtMiddleware.validRefreshNeeded,
            authController.createJWT
        ]);
    }
}
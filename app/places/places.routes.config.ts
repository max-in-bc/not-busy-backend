import { CommonRoutesConfig, configureRoutes } from '../common/common.routes.config';
import { PlacesMiddleware } from './middlewares/places.middleware';
// import { CommonPermissionMiddleware } from '../common/middlewares/common.permission.middleware';
import { JwtMiddleware } from '../auth/middlewares/jwt.middleware';
import express from 'express';
import { PlacesController } from './controllers/places.controllers';
export class PlacesRoutes extends CommonRoutesConfig implements configureRoutes {
    constructor(app: express.Application) {
        super(app, 'PlacesRoutes');
        this.configureRoutes();
    }
    configureRoutes() {
        const placesController = new PlacesController();
        const placesMiddleware = PlacesMiddleware.getInstance();
        const jwtMiddleware = JwtMiddleware.getInstance();
        // const commonPermissionMiddleware = new CommonPermissionMiddleware();
        this.app.get(`/places`, [
            // jwtMiddleware.validJWTNeeded,
            placesMiddleware.validatePlacesSearchParams,
            placesMiddleware.extractPlacesSearchParams,
            placesController.searchPlaces
        ]);
       
        this.app.get(`/place/:placeId`, [
            // jwtMiddleware.validJWTNeeded,
            // commonPermissionMiddleware.minimumPermissionLevelRequired(CommonPermissionMiddleware.BASIC_PERMISSION),
            // commonPermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
            placesMiddleware.validatePlaceId,
            placesMiddleware.extractPlaceId,
            placesController.getPlaceById
        ]);
    }
}
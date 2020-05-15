import express from 'express';
export class PlacesMiddleware {
    private static instance: PlacesMiddleware;

    static getInstance() {
        if (!PlacesMiddleware.instance) {
            PlacesMiddleware.instance = new PlacesMiddleware();
        }
        return PlacesMiddleware.instance;
    }

    validatePlacesSearchParams(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.query && req.query.lat && req.query.lng) {
            next();
        } else {
            res.status(400).send({ error: `Missing required fields email and password` });
        }
    }

    extractPlacesSearchParams(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.location = req.query.lat + ',' + req.query.lng;
        if (req.query.searchTerm){
            req.body.searchTerm = req.query.searchTerm;
        }
        next();
    }

    validatePlaceId(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.params && req.params.placeId) {
            next();
        } else {
            res.status(400).send({ error: `Missing place id from route params` });
        }
    }
    extractPlaceId(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.params.placeId){
            req.body.placeId =  req.params.placeId;
        }
        next();
    }

    // async validatePlaceExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    //     const placesService = PlacesService.getInstance();
    //     const place = await placesService.getPlaceById(req.params.placeId);
    //     if (place) {
    //         next();
    //     } else {
    //         res.status(404).send({ error: `User ${req.params.placeId} not found` });
    //     }
    // }
    
}
import express from 'express';
import { PlacesService } from '../services/places.service';


export class PlacesController {


    async searchPlaces(req: express.Request, res: express.Response) {
        const placesService = PlacesService.getInstance();
        const places_data = await placesService.searchByLocation(req.body.location, req.body.searchTerm);
        if (places_data && places_data.data && places_data.data.results && Array.isArray(places_data.data.results) && places_data.data.results.length > 0){


            res.status(200).send({ places: places_data.data.results });
        }
        else{
            res.status(404).send({ error: `No places found at ${req.body.location}` });
        }
    }

    async getPlaceById(req: express.Request, res: express.Response) {
        const placesService = PlacesService.getInstance();
     
        const places_data = await placesService.getPlaceById(req.body.placeId);
        if (places_data && places_data.data && places_data.data.result){
            res.status(200).send({place:places_data.data.result});
        }
        else {
            res.status(404).send({ error: `Place ${req.body.placeId} not found` });
        }
        
    }


}
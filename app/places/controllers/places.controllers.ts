import express from 'express';
import { PlacesService } from '../services/places.service';
import { Place } from './place.interface';


export class PlacesController {


    async searchPlaces(req: express.Request, res: express.Response) {
        const placesService = PlacesService.getInstance();
        const places_data = await placesService.searchByLocation(req.body.location, req.body.searchTerm);
        if (places_data && places_data.data && places_data.data.results && Array.isArray(places_data.data.results)){

            let filtered: any = [];
            places_data.data.results.forEach((place_raw: any) => {
                const allowed = ['name', 'vicinity', 'geometry', 'place_id'];

                let place = Object.keys(place_raw)
                .filter(key => allowed.includes(key))
                .reduce((obj: any, key: string) => {
                    obj[key] = place_raw[key];
                    return obj;
                }, {});
                
                filtered.push(<Place>{
                    name: place.name,
                    address: place.vicinity,
                    location: place.geometry.location,
                    place_id: place.place_id
                });
            });
           


            res.status(200).send({ places: filtered });
        }
        else{
            res.status(404).send({ error: `No places found at ${req.body.location}` });
        }
    }

    async getPlaceById(req: express.Request, res: express.Response) {
        const placesService = PlacesService.getInstance();
     
        const places_data: any = await placesService.getPlaceById(req.body.placeId);
        if (places_data && places_data.data && places_data.data.result){
            const allowed = ['name', 'vicinity', 'geometry', 'place_id'];

            let place = Object.keys(places_data.data.result)
            .filter(key => allowed.includes(key))
            .reduce((obj: any, key: string) => {
                obj[key] = places_data.data.result[key];
                return obj;
            }, {});
            
            res.status(200).send(<Place>{
                name: place.name,
                address: place.vicinity,
                location: place.geometry.location,
                place_id: place.place_id
            });
        }
        else {
            res.status(404).send({ error: `Place ${req.body.placeId} not found` });
        }
        
    }


}
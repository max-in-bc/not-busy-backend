import express from 'express';
import { PlacesService } from '../services/places.service';
import { Place } from './place.interface';


export class PlacesController {


    async searchPlaces(req: express.Request, res: express.Response) {
        const placesService = PlacesService.getInstance();
        const places_data = await placesService.searchByLocation(req.body.location, req.body.searchTerm);
        if (places_data && places_data.data && places_data.data.results && Array.isArray(places_data.data.results)){

            let filtered_req: any = [];
            let raw_places: any = [];
            places_data.data.results.forEach( (place_raw: any) => {
                const allowed = ['name', 'vicinity', 'geometry', 'place_id', 'photos', 'icon'];
                let place = Object.keys(place_raw)
                .filter(key => allowed.includes(key))
                .reduce((obj: any, key: string) => {
                    obj[key] = place_raw[key];
                    return obj;
                }, {});
                raw_places.push(place);
                let pd = placesService.getPlacePopularityById(place_raw.place_id);
                filtered_req.push(pd);
            });
           
            Promise.all(filtered_req).then(data => {
                let filtered: Array<any> = [];
                data.forEach((place_popularity_data: any, i: number) => {
          
                    
                    filtered.push(<Place>{
                        name: raw_places[i].name,
                        address: raw_places[i].vicinity,
                        location: raw_places[i].geometry.location,
                        place_id: raw_places[i].place_id,
                        thumbnail:raw_places[i].icon,
                        popularity_data: {
                            popular_times: place_popularity_data.popular_times,
                            time_wait: place_popularity_data.time_wait,
                            time_spent: place_popularity_data.time_spent,
                            current_popularity: place_popularity_data.current_popularity
                        }
                    });
                });
                res.status(200).send({places:filtered});
                
            })
        }
        else{
            res.status(404).send({ error: `No places found at ${req.body.location}` });
        }
    }

    async getPlaceById(req: express.Request, res: express.Response) {
        const placesService = PlacesService.getInstance();
     
        const places_data: any = await placesService.getPlaceById(req.body.placeId);
        if (places_data && places_data.data && places_data.data.result){
            const allowed = ['name', 'vicinity', 'geometry', 'place_id', 'photos'];

            let place = Object.keys(places_data.data.result)
            .filter(key => allowed.includes(key))
            .reduce((obj: any, key: string) => {
                obj[key] = places_data.data.result[key];
                return obj;
            }, {});
            placesService.getPlacePopularityById(place.place_id).then(place_popularity_data => {
                res.status(200).send(<Place>{
                    name: place.name,
                    address: place.vicinity,
                    location: place.geometry.location,
                    place_id: place.place_id,
                    thumbnail: place.photos && place.photos.length > 0  ? place.photos[0].photo_reference : null,
                    popularity_data: {
                        popular_times: place_popularity_data.popular_times,
                        time_wait: place_popularity_data.time_wait,
                        time_spent: place_popularity_data.time_spent,
                        current_popularity: place_popularity_data.current_popularity
                    }
                });
            });
           
        }
        else {
            res.status(404).send({ error: `Place ${req.body.placeId} not found` });
        }
        
    }


}
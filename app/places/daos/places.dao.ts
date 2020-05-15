import {Client, Status} from "@googlemaps/google-maps-services-js";
import { GooglePlacesService } from "../../common/services/google.places.service";
import { environment } from '../../../dev.env';
import { PlacesNearbyRanking } from "@googlemaps/google-maps-services-js/dist/places/placesnearby";

export class PlacesDao {
    googlePlacesService: GooglePlacesService = GooglePlacesService.getInstance();
    private static instance: PlacesDao;
 
    constructor() {
    }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new PlacesDao();
        }
        return this.instance;
    }
   
    async getPlaceById(place_id: string) {
        return  this.googlePlacesService.getGooglePlaceClient().placeDetails({
            params: {
                key: environment.google_places_api_key,
                place_id
            } 
        })
    }
    async searchPlaces(location: string, keyword?: string, limit: number = 0, page: number = 0) {
        let  params: any = {
            key: environment.google_places_api_key,
            location,
            rankby: PlacesNearbyRanking.distance
        } 
        if (keyword){
            params['keyword'] = keyword;
        }
        
        return  this.googlePlacesService.getGooglePlaceClient().placesNearby({
            params
        })
    }


}
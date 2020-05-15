import {CRUD} from '../../common/interfaces/crud.interface';
import { PlacesDao } from '../daos/places.dao';

export class PlacesService {
    private static instance: PlacesService;

    constructor() {
    }

    static getInstance(): PlacesService {
        if (!PlacesService.instance) {
            PlacesService.instance = new PlacesService();
        }
        return PlacesService.instance;
    }

   
    searchByLocation(location: string, keyword?: string) {
        return PlacesDao.getInstance().searchPlaces(location, keyword);
    };

    getPlaceById(resourceId: any) {
        return PlacesDao.getInstance().getPlaceById(resourceId);
    };

}
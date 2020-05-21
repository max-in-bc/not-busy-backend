import {CRUD} from '../../common/interfaces/crud.interface';
import { PlacesDao } from '../daos/places.dao';
import { PopularityDao } from '../daos/popularity.dao';

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

    getPlacePopularityById(resourceId: string){
        return PopularityDao.getInstance().getPlacePopularityById(resourceId);
    }
    
    getPlaceThumbnailById(resourceId: any){
        return PlacesDao.getInstance().getPlaceThumbnailById(resourceId);
    }

}
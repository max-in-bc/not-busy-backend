import { PlacesDao } from '../daos/places.dao';
import { PopularityDao } from '../daos/popularity.dao';
import { PopularityData } from '../controllers/place.interface';

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

    getPlacePopularityById(resourceId: string, is_open: boolean): Promise<PopularityData>{
        return PopularityDao.getInstance().getPlacePopularityById(resourceId).catch(err => {
            if (err && err.add_default === true){
                return {
                    current_popularity: is_open ? 50 : 0 //default to average business if it is open but no popularity is availble; 0 otherwise
                }
            }
            else return {};
        });
    }
    
    getPlaceThumbnailById(resourceId: any){
        return PlacesDao.getInstance().getPlaceThumbnailById(resourceId);
    }

}

import { GooglePlacesService } from "../../common/services/google.places.service";
import { resolve } from "dns";
import { environment } from "../../../dev.env";
import { spawn } from "child_process";

export class PopularityDao {
    googlePlacesService: GooglePlacesService = GooglePlacesService.getInstance();
    private static instance: PopularityDao;
 
    constructor() {
    }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new PopularityDao();
        }
        return this.instance;
    }

    async getPlacePopularityById(place_id: string) {
        return new Promise<any>((resolve, reject) => {
          
            const execFile = require('child_process').execFile;
            const child = execFile('python3', ['./scrape_site_popularity.py',  
            environment.google_places_api_key,
            place_id], (error: any, stdout: any, stderr: any) => {
                if (error) {
                    //error running script do not print to stderr or stdout
                    reject({error, add_default: true});
                }
                let data = JSON.parse(stdout);
                if (data && typeof(data) == 'object' && Object.keys(data).length == 0){
                    reject({error:'No popularity available for ' + place_id, add_default: true});
                }
                else{
                    resolve(JSON.parse(stdout));
                }
            });
        });
        
        
    }

   
   


}
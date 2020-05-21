
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
        return new Promise<any>(resolve => {
          
            const execFile = require('child_process').execFile;
            const child = execFile('python3', ['./scrape_site_popularity.py',  
            environment.google_places_api_key,
            place_id], (error: any, stdout: any, stderr: any) => {
                if (error) {
                    console.error('stderr', stderr);
                    throw error;
                }
                resolve(JSON.parse(stdout));
            });
        //     var process = spawn('python',["app/places/daos/scrape_site_popularity.py", 
        //     environment.google_places_api_key,
        //     place_id] ); 
          
        //     process.stdout.on('data', (data: any) =>  { 
        //         resolve(JSON.parse(data.toString()))
        //     } )
        //     process.stderr.on('data', (data) => {
        //         console.error(`child stderr:\n${data}`);
        //         resolve()
        //       }); 
       
            //   const { exec } = require("child_process");
            //   exec ("python3 -m scrape_site_popularity.py", (error: { message: any; }, stdout: any, stderr: any) => {
            // //   exec("python3 app/places/daos/scrape_site_popularity.py " + environment.google_places_api_key + ' ' + place_id, (error: { message: any; }, stdout: any, stderr: any) => {
            //       if (error) {
            //           console.log(`error: ${error.message}`);
            //           return;
            //       }
            //       if (stderr) {
            //           console.log(`stderr: ${stderr}`);
            //           return;
            //       }
            //       console.log(`stdout: ${stdout}`);
            //   });
        });
        
        
    }

   
   


}
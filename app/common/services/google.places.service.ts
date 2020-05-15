import {Client, Status} from "@googlemaps/google-maps-services-js";
export class GooglePlacesService {
    private static instance: GooglePlacesService;
    client = new Client({});

    constructor() {
        this.initializeGoogleMapsPlacesAPI();
    }
    public static getInstance() {
        if (!this.instance) {
            this.instance = new GooglePlacesService();
        }
        return this.instance;
    }
    getGooglePlaceClient() {
        return this.client;
    }
    initializeGoogleMapsPlacesAPI() {
        console.log('GM Places API connect');
        
    };
}
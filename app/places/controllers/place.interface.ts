import { LatLng } from "@googlemaps/google-maps-services-js";

export interface Place{
    name: string,
    address: string,
    location: LatLng,
    place_id: string,
    thumbnail?: string,
  
    popularity_data?: {
        popular_times?: any,
        time_wait?: any,
        time_spent?: any,
        current_popularity?: number
    }
}
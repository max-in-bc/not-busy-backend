import { LatLng } from "@googlemaps/google-maps-services-js";

export interface Place{
    name: string,
    address: string,
    location: LatLng,
    place_id: string,
    thumbnail?: string,
    popularity_data?: any,
    time_wait?: any,
    current_popularity?: number
}
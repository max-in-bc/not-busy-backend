import { LatLng } from "@googlemaps/google-maps-services-js";

export interface Place{
    name: string,
    address: string,
    location: LatLng,
    place_id: string
}
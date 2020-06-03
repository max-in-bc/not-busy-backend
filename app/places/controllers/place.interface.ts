import { LatLng } from "@googlemaps/google-maps-services-js";
export interface PopularityData{
    popular_times?: Array<{
        name: "Monday"|"Tuesday"|"Wednesday"|"Thursday"|"Friday"|"Saturday"|"Sunday", 
        data: [number, number, number, number, number, number, number, number, number, number, number, number, 
            number, number, number, number, number, number, number, number, number, number, number, number]}>, //24 length array for each hour in the day
    time_wait?: Array<number>,
    time_spent?: Array<number>,
    current_popularity?: number
}

export interface Place{
    name: string,
    address: string,
    location: LatLng,
    place_id: string,
    thumbnail?: string,
  
    popularity_data?: PopularityData
}
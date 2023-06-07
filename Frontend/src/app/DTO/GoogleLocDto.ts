import {GoogleLocGeoDto} from "./GoogleLocGeoDto";

export interface GoogleLocDto {
  address_components : Object;
  geometry : GoogleLocGeoDto;
  formatted_address : Object;
  place_id : Object;
  types : Object;
}

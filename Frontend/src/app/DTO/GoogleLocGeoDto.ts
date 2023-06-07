import {GoogleLocCoordDto} from "./GoogleLocCoordDto";

export interface GoogleLocGeoDto {
  bounds : Object;
  location : GoogleLocCoordDto;
  location_type : Object;
  viewport : Object;
}

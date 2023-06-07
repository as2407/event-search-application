import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IpDto} from "./DTO/IpDto";
import {VenueDto} from "./DTO/VenueDto";
import {SearchDto} from "./DTO/SearchDto";
import {EventDto} from "./DTO/EventDto";
import {GoogleLocDto} from "./DTO/GoogleLocDto";
import {GoogleLocLev1Dto} from "./DTO/GoogleLocLev1Dto";
import {ErrorDTO} from "./DTO/ErrorDTO";
import {SpotifyDto} from "./DTO/SpotifyDto";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  baseurl = 'https://nodeproject-382305.uc.r.appspot.com/api/v1'
  constructor(private httpClient : HttpClient) { }

  ipInfo() {
    return this.httpClient.get<IpDto>('https://ipinfo.io/', {
      params: {
        token: "8084667b8b3fe1"
      }
    });
  }
  getSearch(keyword : string, distance : number, category : string, lat: number, lng : number) {
    return this.httpClient.get<SearchDto[] | undefined>(this.baseurl + '/search',{
      params: {
        keyword: keyword,
        distance: distance,
        category: category,
        lat: lat,
        lng: lng
      }
    });
 }

 googleLocation(location:string) {
    return this.httpClient.get<GoogleLocLev1Dto>('https://maps.googleapis.com/maps/api/geocode/json' , {
      params: {
        address: location,
        key: 'AIzaSyC3POJMNAQlvlS7GFLYZAKe9umJI5wZfmc'
      }
    })
 }

 getVenue(keyword : string) {
    return this.httpClient.get<VenueDto>(this.baseurl + '/venue', {
      params: {
        keyword:keyword
      }
    });
 }

 getEvent(id : string) {
    return this.httpClient.get<EventDto>(this.baseurl + '/event', {
      params: {
        id: id
      }
    });
 }

 getSuggest(keyword: string) {
    return this.httpClient.get<string[]>(this.baseurl + '/suggest', {
      params: {
        keyword: keyword
      }
    })
 }

  getSpotifyDetails(keyword: string) {
    return this.httpClient.get<SpotifyDto>(this.baseurl + '/getSpotifyArtist', {
      params: {
        keyword: keyword
      }
    })
  }

}

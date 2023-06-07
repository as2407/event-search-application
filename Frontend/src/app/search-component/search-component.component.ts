import {Component, OnInit} from '@angular/core';
import {searchModelClass} from "../DTO/searchModelClass";
import {SearchDto} from "../DTO/SearchDto";
import {EventDto} from "../DTO/EventDto";
import {VenueDto} from "../DTO/VenueDto";
import {HttpRequestService} from "../http-request.service";
import {catchError, of} from "rxjs";
import {SpotifyDto} from "../DTO/SpotifyDto";

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent {

  resultArray : SearchDto[] | undefined; //getting array of 20 data
  eventDetails: EventDto | undefined; // one set of data
  venueDetails: VenueDto | undefined;

  viewCard = false;
  spotifyDetails: SpotifyDto[] | undefined = [];
  name : string = ''

  constructor(private httpRequestService : HttpRequestService) { }
  onBackPressed(data: any) {
    this.viewCard = false;
  }
  searchFormData(data: SearchDto[]) {
    console.log(data)
    if(data !== null) {
      // @ts-ignore
      data.sort((a, b) => this.compare(a, b));
      this.resultArray = data;
    }
    else {
      this.resultArray = [];
    }
    // console.log(data);
    this.viewCard = false
  }

  compare(a : any, b : any) {
    const adata = Date.parse(a.localDate + "T" + a.localTime + "Z");
    const bdata = Date.parse(b.localDate + "T" + b.localTime + "Z");
    console.log(adata)
    console.log(bdata)
    if(adata == bdata) return 0;
    if(adata > bdata) return 1;
    return -1;
  }

  emitEventVenue(data: string) {
    this.viewCard = true;
    const id = data.split(':')[0];
    console.log(id)
    const keyword = data.split(':')[1];
    this.name = data.split(":")[2];
    this.httpRequestService.getEvent(id)
      .pipe(catchError(err => {
        console.log(err)
        return of(null);
      }))
      .subscribe((response)=>{
      this.httpRequestService.getVenue(keyword)
        .pipe(catchError(err => {
          return of(null);
        }))
        .subscribe((response1)=> {

          if(response && response.musicArtist) {
            this.spotifyDetails = [];
            for(let i = 0; i < response.musicArtist.length; i++) {
              const a = this.httpRequestService.getSpotifyDetails(response.musicArtist[i]);
              a.subscribe((res) => {
                this.spotifyDetails?.push(res);
                if(response) this.eventDetails = response;
                if(response1) this.venueDetails = response1;
              })
            }
            if(response) this.eventDetails = response;
            if(response1) this.venueDetails = response1;
          }
          else {
            if(response) this.eventDetails = response;
            if(response1) this.venueDetails = response1;
          }
      })
    })
  }

  reset(event : any) {
    this.resultArray = undefined;
    this.viewCard = false;
    this.eventDetails = undefined;
    this.venueDetails = undefined;
    this.spotifyDetails = [];
    this.name = '';
  }

}

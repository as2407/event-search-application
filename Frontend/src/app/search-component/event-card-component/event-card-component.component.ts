import {AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventDto} from "../../DTO/EventDto";
import {VenueDto} from "../../DTO/VenueDto";
import {SpotifyDto} from "../../DTO/SpotifyDto";
import {HttpRequestService} from "../../http-request.service";
import {window} from "rxjs";

@Component({
  selector: 'app-event-card-component',
  templateUrl: './event-card-component.component.html',
  styleUrls: ['./event-card-component.component.css']
})
export class EventCardComponentComponent{

  @Input() eventInfo : EventDto | undefined;
  @Input() venueInfo : VenueDto | undefined;
  @Input() eventName: string = '';
  @Input() spotifyDetails: SpotifyDto[] | undefined = [];

  @Output() backEventEmitter = new EventEmitter();
  isFav : boolean = false;
  ohShowmore : boolean = false;
  gnShowmore : boolean = false;

  crShowmore : boolean = false;
  mapOptions: google.maps.MapOptions = {
    center: {lat: 38.9987208, lng: -77.2538699}
  }
  marker = {
    position: { lat: 38.9987208, lng: -77.2538699 }
  }

  constructor(private httpRequest:HttpRequestService) {

    console.log(this.venueInfo?.openHours,  this.venueInfo?.generalRule)
  }


  combineGenres() {
    let ans: string[] = [];
    if(this.eventInfo) {
      if(this.eventInfo.segment) ans.push(this.eventInfo.segment);
      if(this.eventInfo.genre) ans.push(this.eventInfo.genre);
      if(this.eventInfo.subGenre) ans.push(this.eventInfo.subGenre);
      if(this.eventInfo.type) ans.push(this.eventInfo.type);
      if(this.eventInfo.subType) ans.push(this.eventInfo.subType);
      // console.log(this.spotifyDetails);
      return ans.join(' | ')
    }
    return '';
  }

  combineAddress() {
    let ans: string[] = [];
    if(this.venueInfo) {
      if(this.venueInfo.address) ans.push(this.venueInfo.address);
      if(this.venueInfo.city) ans.push(this.venueInfo.city);
      if(this.venueInfo.state) ans.push(this.venueInfo.state);
      return ans.join(', ')
    }
    return '';
  }

  getVenueAddressCoords() {
    const address = this.combineAddress()
    console.log(address)
    console.log(this.eventInfo?.venue)
    this.httpRequest.googleLocation(address).subscribe((res) => {
      if(res.results.length > 0) {
        const lat1 = parseFloat(res.results[0].geometry.location.lat);
        const lng1 = parseFloat(res.results[0].geometry.location.lng);
        this.mapOptions = {
          center: {lat: lat1, lng: lng1}
        }
        this.marker = {
          position: {lat: lat1, lng: lng1},
        }
        console.log(this.marker);
        console.log(this.mapOptions);
      }

    })
  }

  onBackPress() {
    this.backEventEmitter.emit();
  }

  onFavouriteClick() {
    const key = this.eventName + "::" + this.eventInfo?.localDate + this.eventInfo?.localTime
    if(!localStorage.getItem(key)) {
      let ans: string[] = [];
      if (this.eventInfo) {
        if (this.eventInfo.segment) ans.push(this.eventInfo.segment);
        if (this.eventInfo.genre) ans.push(this.eventInfo.genre);
        if (this.eventInfo.subGenre) ans.push(this.eventInfo.subGenre);
        const category = ans.join(' | ')
        const value = this.eventInfo?.localDate + "::" + this.eventName + "::" + category +"::" + this.eventInfo?.venue;
        localStorage.setItem(key, value)
        this.isFav = true;
        alert('Event Added to Favourites!')
      }
    }
    else {
      localStorage.removeItem(key);
      this.isFav = false;
      alert('Event Removed from Favourites!')
    }

    for(let i=0; i<localStorage.length; i++) {
      const key = localStorage.key(i);
      if(key)
        console.log(key + " :: " + localStorage.getItem(key))
    }
  }

  iconClass() {
    if(!localStorage.getItem(this.eventName + "::" + this.eventInfo?.localDate + this.eventInfo?.localTime)) {
      return 'assets/heart-thin-icon.svg';
    }
    else return 'assets/red-heart-icon.svg'
  }


}

import { Component } from '@angular/core';
import {FavouritesDto} from "../DTO/FavouritesDto";

@Component({
  selector: 'app-favourites-component',
  templateUrl: './favourites-component.component.html',
  styleUrls: ['./favourites-component.component.css']
})
export class FavouritesComponentComponent {

  favList : FavouritesDto[] = []
  constructor() {
    this.populate()
  }

  populate() {
    this.favList = []
    for(let i=0; i<localStorage.length; i++) {
      const k = localStorage.key(i);
      if(k) {
        // @ts-ignore
        const arr = localStorage.getItem(k).split("::");
        const datetime = k.split("::")[1];
        const item = new FavouritesDto(i + 1, arr[0], datetime, arr[1], arr[2], arr[3]);
        this.favList.push(item)
      }
    }
  }
  onDelete(key:string) {
    localStorage.removeItem(key)
    alert('Removed from Favourites!')
    this.populate()
  }
}


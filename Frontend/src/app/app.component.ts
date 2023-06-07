import { Component } from '@angular/core';
import {HttpRequestService} from "./http-request.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HW8Final';
  constructor(private httpRequestService:HttpRequestService) { }
//   print() {
//     this.httpRequestService.ipInfo().subscribe((response) => {
//       console.log(response.loc);
//     })
//
//     this.httpRequestService.getSearch('concert',5, 'Music',34.022350, -118.285118).subscribe((response  ) => {
//       console.log(response);
//     })
//
//     this.httpRequestService.getVenue('Comerica Park').subscribe((response) => {
//       console.log(response);
//     })
//
//     this.httpRequestService.getEvent('vvG1jZ905EJNgw').subscribe((response) =>{
//       console.log(response);
//     })
//
//     this.httpRequestService.getSuggest('app').subscribe((response) => {
//       console.log(response);
//     })
//
//   }
}

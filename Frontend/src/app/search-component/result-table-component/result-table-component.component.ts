import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SearchDto} from "../../DTO/SearchDto";

@Component({
  selector: 'app-result-table-component',
  templateUrl: './result-table-component.component.html',
  styleUrls: ['./result-table-component.component.css']
})
export class ResultTableComponentComponent {

  @Input() search20Data : SearchDto[] = [];
  @Output() eventvenueID : EventEmitter<string> = new EventEmitter<string>();

  getEventVenue(id : string, keyword : string, name:string) {
    const s = id + ':' + keyword + ':' + name;
    this.eventvenueID.emit(s);
  }

  constructor() {
    console.log(this.search20Data)
  }
}

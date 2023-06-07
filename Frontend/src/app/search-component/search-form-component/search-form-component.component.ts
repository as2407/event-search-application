import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {searchModelClass} from "../../DTO/searchModelClass";
import {HttpRequestService} from "../../http-request.service";
import {SearchDto} from "../../DTO/SearchDto";
import {FormControl, NgForm} from "@angular/forms";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  tap
} from "rxjs";

@Component({
  selector: 'app-search-form-component',
  templateUrl: './search-form-component.component.html',
  styleUrls: ['./search-form-component.component.css']
})
export class SearchFormComponentComponent implements OnInit {
  @Output() searchResult: EventEmitter<SearchDto[]> = new EventEmitter<SearchDto[]>();
  @Output() searchReset: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('searchForm') myForm: NgForm | undefined;
  showSpinner = false;
  model = new searchModelClass('', 10, 'Default', '', false);
  promptList: any = [];
  searchKeywordControl = new FormControl();
  // filteredOptions: Observable<any>;
  constructor(private httpRequestService: HttpRequestService) {

  }

  filter(val: string): Observable<any> {
    return this.httpRequestService.getSuggest(val)
      .pipe(
        map(response => response.filter(option => {
          return option;
        }))
      )
  }

  removeLoc() {
    if (this.model.autoLocation) {
      this.model.location = "";

    }
    return this.model.autoLocation;
  }

  ngOnInit(): void {
    this.searchKeywordControl.valueChanges.pipe(
      filter((res) => {
        return res !== null;
      }),
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => {
        this.showSpinner = true;
        this.promptList = [];
      }),
      switchMap(value => this.httpRequestService.getSuggest(value))
    ).subscribe((data) => {
      this.promptList = data;
      this.showSpinner = false;
    })
  }

  displayWith(value: any) {
    if(value === null) return '';
    return value;
  }
  onPromptSelect() {
    this.model.keyword = this.model.keyword
  }
  SubmitForm(form: any) {
    console.log(this.model.keyword)
    if (this.model.autoLocation) {
      this.httpRequestService.ipInfo()
        .pipe(catchError(err => {
          this.searchResult.emit([]);
          return of(null);
        }))
        .subscribe((response) => {
        if(response !== null && response !== undefined) {
          // @ts-ignore
          const lat = parseFloat(response.loc.split(',')[0]);
          // @ts-ignore
          const lng = parseFloat(response.loc.split(',')[1]);
          console.log(this.model.keyword + "::" + this.model.distance + "::" + this.model.category)
          this.httpRequestService.getSearch(this.model.keyword, this.model.distance, this.model.category, lat, lng)
            .pipe(catchError(err => {
              this.searchResult.emit([]);
              return of(undefined);
            }))
            .subscribe((data) => {
              this.searchResult.emit(data);
            })
        }
        else {
          this.searchResult.emit([]);
        }

      })

    } else {

      this.httpRequestService.googleLocation(this.model.location)
        .pipe(catchError(err => {
          this.searchResult.emit([]);
          return of(null);
        }))
        .subscribe((response) => {
          if(response !== null && response.results.length >= 1) {
            const lat = parseFloat(response.results[0].geometry.location.lat);
            const lng = parseFloat(response.results[0].geometry.location.lng);
            console.log(lat);
            console.log(lng);
            this.httpRequestService.getSearch(this.model.keyword, this.model.distance, this.model.category, lat, lng)
              .pipe(catchError(err => {
                this.searchResult.emit([]);
                return of([]);
              }))
              .subscribe((data) => {
                console.log(data);
                this.searchResult.emit(data);
              })
          }
          else {
            this.searchResult.emit([]);
          }

      })

    }
  }

  onReset(b: any) {
    this.model.keyword = '';
    this.model.distance = 10;
    this.model.category = 'Default';
    this.model.location = '';
    this.model.autoLocation = false;
    this.searchReset.emit(b);
  }

}

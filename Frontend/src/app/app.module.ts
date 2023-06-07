import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { SearchComponentComponent } from './search-component/search-component.component';
import { SearchFormComponentComponent } from './search-component/search-form-component/search-form-component.component';
import { SearchTitleBarComponentComponent } from './search-component/search-title-bar-component/search-title-bar-component.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ResultTableComponentComponent } from './search-component/result-table-component/result-table-component.component';
import { EventCardComponentComponent } from './search-component/event-card-component/event-card-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import { NoResultComponentComponent } from './search-component/no-result-component/no-result-component.component';
import {MatIconModule} from "@angular/material/icon";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CdkListboxModule} from "@angular/cdk/listbox";
import { AppRoutingModule } from './app-routing.module';
import { FavouritesComponentComponent } from './favourites-component/favourites-component.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
// import { AppRoutingModule } from './search-component/event-card-component/app-routing.module';
// import { MapComponentComponent } from './search-component/event-card-component/map-component/map-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponentComponent,
    SearchFormComponentComponent,
    SearchTitleBarComponentComponent,
    ResultTableComponentComponent,
    EventCardComponentComponent,
    NoResultComponentComponent,
    FavouritesComponentComponent,

  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTabsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        GoogleMapsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MatProgressSpinnerModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

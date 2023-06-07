import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesComponentComponent } from './favourites-component.component';

describe('FavouritesComponentComponent', () => {
  let component: FavouritesComponentComponent;
  let fixture: ComponentFixture<FavouritesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritesComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

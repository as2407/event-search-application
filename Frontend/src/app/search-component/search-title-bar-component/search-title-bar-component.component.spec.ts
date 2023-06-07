import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTitleBarComponentComponent } from './search-title-bar-component.component';

describe('SearchTitleBarComponentComponent', () => {
  let component: SearchTitleBarComponentComponent;
  let fixture: ComponentFixture<SearchTitleBarComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTitleBarComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTitleBarComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

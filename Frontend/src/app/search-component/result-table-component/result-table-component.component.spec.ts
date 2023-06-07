import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultTableComponentComponent } from './result-table-component.component';

describe('ResultTableComponentComponent', () => {
  let component: ResultTableComponentComponent;
  let fixture: ComponentFixture<ResultTableComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultTableComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

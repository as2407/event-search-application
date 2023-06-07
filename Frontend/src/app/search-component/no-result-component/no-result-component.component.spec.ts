import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoResultComponentComponent } from './no-result-component.component';

describe('NoResultComponentComponent', () => {
  let component: NoResultComponentComponent;
  let fixture: ComponentFixture<NoResultComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoResultComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoResultComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

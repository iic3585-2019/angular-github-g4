import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsDetailsComponent } from './commits-details.component';

describe('CommitsDetailsComponent', () => {
  let component: CommitsDetailsComponent;
  let fixture: ComponentFixture<CommitsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

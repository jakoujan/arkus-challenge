import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsViewerComponent } from './assignments-viewer.component';

describe('AssignmentsViewerComponent', () => {
  let component: AssignmentsViewerComponent;
  let fixture: ComponentFixture<AssignmentsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentsViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupclientComponent } from './popupclient.component';

describe('PopupclientComponent', () => {
  let component: PopupclientComponent;
  let fixture: ComponentFixture<PopupclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

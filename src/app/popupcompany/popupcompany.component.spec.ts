import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupcompanyComponent } from './popupcompany.component';

describe('PopupcompanyComponent', () => {
  let component: PopupcompanyComponent;
  let fixture: ComponentFixture<PopupcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

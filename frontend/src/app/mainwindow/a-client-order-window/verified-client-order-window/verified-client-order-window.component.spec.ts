import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedClientOrderWindowComponent } from './verified-client-order-window.component';

describe('VerifiedClientOrderWindowComponent', () => {
  let component: VerifiedClientOrderWindowComponent;
  let fixture: ComponentFixture<VerifiedClientOrderWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedClientOrderWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedClientOrderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

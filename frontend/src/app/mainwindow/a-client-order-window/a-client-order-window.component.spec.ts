import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AClientOrderWindowComponent } from './a-client-order-window.component';

describe('AClientOrderWindowComponent', () => {
  let component: AClientOrderWindowComponent;
  let fixture: ComponentFixture<AClientOrderWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AClientOrderWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AClientOrderWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

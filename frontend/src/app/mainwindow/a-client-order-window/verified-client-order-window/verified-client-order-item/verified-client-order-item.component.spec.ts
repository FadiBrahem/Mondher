import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedClientOrderItemComponent } from './verified-client-order-item.component';

describe('VerifiedClientOrderItemComponent', () => {
  let component: VerifiedClientOrderItemComponent;
  let fixture: ComponentFixture<VerifiedClientOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedClientOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedClientOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

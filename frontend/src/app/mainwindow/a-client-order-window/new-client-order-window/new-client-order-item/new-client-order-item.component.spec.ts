import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDoctorOrderItemComponent } from './new-client-order-item.component';

describe('NewDoctorOrderItemComponent', () => {
  let component: NewDoctorOrderItemComponent;
  let fixture: ComponentFixture<NewClientOrderItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClientOrderItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClientOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

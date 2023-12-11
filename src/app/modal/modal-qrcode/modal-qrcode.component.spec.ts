import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQrcodeComponent } from './modal-qrcode.component';

describe('ModalQrcodeComponent', () => {
  let component: ModalQrcodeComponent;
  let fixture: ComponentFixture<ModalQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalQrcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

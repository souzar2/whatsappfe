import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReconnectQrcodeComponent } from './reconnect-qrcode.component';

describe('ReconnectQrcodeComponent', () => {
  let component: ReconnectQrcodeComponent;
  let fixture: ComponentFixture<ReconnectQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReconnectQrcodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReconnectQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemTileComponent } from './mensagem-tile.component';

describe('MensagemTileComponent', () => {
  let component: MensagemTileComponent;
  let fixture: ComponentFixture<MensagemTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensagemTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensagemTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

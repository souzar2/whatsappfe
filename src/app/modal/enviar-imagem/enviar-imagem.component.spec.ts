import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnviarImagemComponent } from './enviar-imagem.component';

describe('EnviarImagemComponent', () => {
  let component: ModalEnviarImagemComponent;
  let fixture: ComponentFixture<ModalEnviarImagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEnviarImagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEnviarImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

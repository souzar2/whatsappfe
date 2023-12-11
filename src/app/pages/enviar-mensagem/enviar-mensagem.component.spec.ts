import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviarMensagemComponent } from './enviar-mensagem.component';

describe('EnviarMensagemComponent', () => {
  let component: EnviarMensagemComponent;
  let fixture: ComponentFixture<EnviarMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviarMensagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviarMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExcluirInstanciaComponent } from './modal-excluir-instancia.component';

describe('ModalExcluirInstanciaComponent', () => {
  let component: ModalExcluirInstanciaComponent;
  let fixture: ComponentFixture<ModalExcluirInstanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExcluirInstanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExcluirInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

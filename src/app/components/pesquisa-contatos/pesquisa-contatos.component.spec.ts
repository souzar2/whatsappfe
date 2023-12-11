import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaContatosComponent } from './pesquisa-contatos.component';

describe('PesquisaContatosComponent', () => {
  let component: PesquisaContatosComponent;
  let fixture: ComponentFixture<PesquisaContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisaContatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisaContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

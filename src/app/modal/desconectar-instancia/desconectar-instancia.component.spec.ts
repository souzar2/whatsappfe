import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesconectarInstanciaComponent } from './desconectar-instancia.component';

describe('DesconectarInstanciaComponent', () => {
  let component: DesconectarInstanciaComponent;
  let fixture: ComponentFixture<DesconectarInstanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesconectarInstanciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesconectarInstanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

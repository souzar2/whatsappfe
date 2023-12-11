import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarContatosComponent } from './sidebar-contatos.component';

describe('SidebarContatosComponent', () => {
  let component: SidebarContatosComponent;
  let fixture: ComponentFixture<SidebarContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarContatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

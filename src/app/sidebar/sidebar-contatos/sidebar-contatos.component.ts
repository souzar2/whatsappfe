import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-contatos',
  templateUrl: './sidebar-contatos.component.html',
  styleUrls: ['./sidebar-contatos.component.sass'],
})
export class SidebarContatosComponent {
  items: string[] = ['Contato 1', 'Contato 2', 'Contato 3', 'Contato 4'];

}

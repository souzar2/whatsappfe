import { Component } from '@angular/core';
import { AuthService } from './services/authorization/auth.service';
import { DesconectarInstanciaComponent } from './modal/desconectar-instancia/desconectar-instancia.component';
import { LogoutComponent } from './modal/logout/logout.component';

import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'whatsapp_fe';

  constructor(private AuthService: AuthService, private ModalService: ModalService){

  }

  isAuthenticated(){
    return this.AuthService.isAuthenticated();
  }

  logout(){
    this.ModalService.open(LogoutComponent, {
    
    }).result.then(response  =>{
      
    }).catch(()=>{})
  }
}

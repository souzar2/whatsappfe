import { Component } from '@angular/core';
import { InstanceModel } from 'src/app/models/instance.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ModalService } from 'src/app/services/modal.service';
import { ConexaoComponent } from '../conexao/conexao.component';
import { ModalQrcodeComponent } from 'src/app/modal/modal-qrcode/modal-qrcode.component';
import { AuthService } from 'src/app/services/authorization/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  instance: InstanceModel = new InstanceModel();
  instances: Array<any> = new Array();
  conexao: ConexaoComponent;
  
  constructor(private ModalService: ModalService, private AuthService: AuthService) { }
  ngOnInit() {
   
  }


  criarInstancia() {
    this.ModalService.open(ModalQrcodeComponent, {
    }).result.then(response  =>{
        
    }).catch(()=>{})
    
  }


  isAuthenticated(){
    return this.AuthService.isAuthenticated();
  }
}

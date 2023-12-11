import { Component, OnInit } from '@angular/core';
import { InstanceModel } from 'src/app/models/instance.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ModalService } from 'src/app/services/modal.service';
import { ModalQrcodeComponent } from 'src/app/modal/modal-qrcode/modal-qrcode.component';
import { ReconnectQrcodeComponent } from 'src/app/modal/reconnect-qrcode/reconnect-qrcode.component';
import { EnviarMensagemVariosComponent } from '../enviar-msgs/enviar-mensagem-varios/enviar-mensagem-varios.component';
import { Router } from '@angular/router';
import { DesconectarInstanciaComponent } from 'src/app/modal/desconectar-instancia/desconectar-instancia.component';

@Component({
  selector: 'app-conexao',
  templateUrl: './conexao.component.html',
  styleUrls: ['./conexao.component.sass']
})
export class ConexaoComponent implements OnInit {
  instances: Array<any> = new Array();
  constructor(private InstanceService: InstanceService, private ModalService: ModalService, private router: Router) { }
  ngOnInit() {
    this.listarInstancias();
  }

  criarInstancia() {
    this.ModalService.open(ModalQrcodeComponent, {
    }).result.then(response  =>{
      this.listarInstancias();
    }).catch(()=>{})
    
  }

  redirecionarMensagem(i: number){
    console.log(this.instances[i].instance.instanceName);
    
    this.router.navigate(['enviar-mensagem', this.instances[i].instance.instanceName])
  }

  reconectarInstancia(name: string, status:boolean){
    const model = new InstanceModel();
    model.instanceName = name;
    this.ModalService.open(ReconnectQrcodeComponent, {
      instance: model
    }).result.then(response  =>{
      this.listarInstancias()
    }).catch(()=>{})
  }

  removerInstancia(name: string) {
    this.InstanceService.removerInstancia(name).subscribe(instances => {
      this.listarInstancias();
    }, err => {
      console.log("Erro ao remover instancia", err)
    })
  }

  desconectarInstancia(inst: InstanceModel) {
    const model = inst;
    this.ModalService.open(DesconectarInstanciaComponent, {
      instance: model
    }).result.then(response  =>{
      this.listarInstancias()
    }).catch(()=>{})
    
  }


  listarInstancias() {
    this.InstanceService.listarIntancias().subscribe(instances => {
      this.instances = instances;
    }, err => {
      console.log("Erro", err);
    }
    )
  }

  


}

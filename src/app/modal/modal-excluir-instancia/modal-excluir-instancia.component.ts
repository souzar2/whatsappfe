import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InstanceModel } from 'src/app/models/instance.model';
import { AuthService } from 'src/app/services/authorization/auth.service';
import { InstanceService } from 'src/app/services/instance.service';

@Component({
  selector: 'app-modal-excluir-instancia',
  templateUrl: './modal-excluir-instancia.component.html',
  styleUrls: ['./modal-excluir-instancia.component.sass']
})
export class ModalExcluirInstanciaComponent {
  modalRef: NgbModalRef;
  @Input() instance: InstanceModel = new InstanceModel();
  constructor(private AuthService: AuthService, private InstanceService: InstanceService) { }

  ngOnInit() {

  }

  fecharModal() {
    this.modalRef.close();
  }

  excluirInstancia(){
    this.desconectarInstancia()
    this.removerInstancia()
  }


  removerInstancia() {
    this.InstanceService.removerInstancia(this.instance.instanceName).subscribe(instances => {
      
    }, err => {
      console.log("Erro ao remover instancia", err)
    })
  }

  desconectarInstancia() {

    console.log(this.instance);
    this.InstanceService.desconectarInstancia(this.instance.instanceName).subscribe({
      next: (response) => {
      },
      error: err => {
        console.log("Erro ao desconectar instancia", err)
      }
    })
  }
}

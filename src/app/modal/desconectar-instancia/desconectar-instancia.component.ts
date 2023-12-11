import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InstanceModel } from 'src/app/models/instance.model';
import { InstanceService } from 'src/app/services/instance.service';

@Component({
  selector: 'app-desconectar-instancia',
  templateUrl: './desconectar-instancia.component.html',
  styleUrls: ['./desconectar-instancia.component.sass']
})
export class DesconectarInstanciaComponent {
  modalRef: NgbModalRef;
  @Input() instance: InstanceModel = new InstanceModel();


  constructor(private InstanceService: InstanceService) { }

  ngOnInit() {

  }

  fecharModal() {
    this.modalRef.close();
  }


  desconectarInstancia() {
    console.log(this.instance);
    this.InstanceService.desconectarInstancia(this.instance.instanceName).subscribe({
      next: (response) => {
        this.fecharModal()
      },
      error: err => {
        console.log("Erro ao desconectar instancia", err)
      }
    })
  }
}

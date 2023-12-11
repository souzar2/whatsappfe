import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InstanceModel } from 'src/app/models/instance.model';
import { InstanceService } from 'src/app/services/instance.service';
@Component({
  selector: 'app-modal-qrcode',
  templateUrl: './modal-qrcode.component.html',
  styleUrls: ['./modal-qrcode.component.sass']
})
export class ModalQrcodeComponent {
  modalRef: NgbModalRef;
  @Input() instance: InstanceModel = new InstanceModel();

  qrcode: string
  isLoading = true
  constructor(private InstanceService: InstanceService) { }

  ngOnInit() {
    this.conectarNovaInstancia();
    if(this.instance.status=="open"){
      this.fecharModal()
    }
  }

  fecharModal() {
    this.modalRef.close();
  }

  conectarNovaInstancia(){
    this.InstanceService.novaInstancia(this.instance).subscribe({
      next: (response) => {
        this.qrcode = response.qrcode.base64
        this.isLoading = false
        
      },
      error: err => {
        console.log("Erro ao criar instancia", err)
        this.isLoading = false
      }
    })
  }

}

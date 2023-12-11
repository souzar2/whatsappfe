import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InstanceModel } from 'src/app/models/instance.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ConexaoComponent } from 'src/app/pages/conexao/conexao.component';

@Component({
  selector: 'app-reconnect-qrcode',
  templateUrl: './reconnect-qrcode.component.html',
  styleUrls: ['./reconnect-qrcode.component.sass']
})
export class ReconnectQrcodeComponent {
  modalRef: NgbModalRef;
  isLoading = true;
  @Input() instance: InstanceModel = new InstanceModel();

  qrcode: string
  constructor(private InstanceService: InstanceService) { }

  ngOnInit() {
    this.reconectarInstancia();
  }

  fecharModal() {
    this.modalRef.close();
  }

  reconectarInstancia() {
    console.log(this.instance);
    this.InstanceService.reconectarQrCode(this.instance.instanceName).subscribe({
      next: (response) => {
        this.qrcode = response.base64
        console.log(this.qrcode)
        this.isLoading = false;
      },
      error: err => {
        console.log("Erro ao reconectar instancia", err)
        this.isLoading = false;
      }
    })
  }
}

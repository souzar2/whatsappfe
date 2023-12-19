import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { InstanceModel } from 'src/app/models/instance.model';
import { InstanceService } from 'src/app/services/instance.service';
import { MessageModel } from 'src/app/models/message.model';

@Component({
  selector: 'app-enviar-imagem',
  templateUrl: './enviar-imagem.component.html',
  styleUrls: ['./enviar-imagem.component.sass']
})
export class ModalEnviarImagemComponent {

  @Input() instance: InstanceModel = new InstanceModel();
  @Input() mensagem: MessageModel = new MessageModel();
  
  modalRef: NgbModalRef;

  constructor(private InstanceService: InstanceService) { }

  ngOnInit() {

  }

  fecharModal(){
    this.modalRef.close();
  }

  enviarImagem(){
    this.InstanceService.enviarImgBase64(this.mensagem, this.instance.instanceName).subscribe({
      next: (response) => {
      },
      error: err => {
        console.log("Erro ao enviar mensagem", err)
      }
    })
  }

}
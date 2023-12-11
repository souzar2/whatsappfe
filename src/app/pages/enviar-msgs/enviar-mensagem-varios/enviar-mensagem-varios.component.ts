import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InstanceModel } from 'src/app/models/instance.model';
import { MessageModel } from 'src/app/models/message.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ActivatedRoute } from '@angular/router';
import { ContatoModel } from 'src/app/models/contato.model';

@Component({
  selector: 'app-enviar-mensagem-varios',
  templateUrl: './enviar-mensagem-varios.component.html',
  styleUrls: ['./enviar-mensagem-varios.component.sass']
})

export class EnviarMensagemVariosComponent implements OnInit {
  mensagem: MessageModel = new MessageModel();
  msgsEnviadas: Array<string> = new Array();
  nomeInstancia: string;
  @ViewChild('textareaWrapper') textareaWrapper!: ElementRef;
  @Input() Instance: InstanceModel;
  @Input() contatosAtivos: Array<ContatoModel> = new Array();;


  constructor(private InstanceService: InstanceService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.nomeInstancia = params.get("instance");
    })
    this.mensagem.start();
  }

  receberInformacao(categoria) {
    this.contatosAtivos = categoria.contatosAtivos
  }

  ajustarAlturaTextarea() {
    const textarea = this.textareaWrapper.nativeElement.querySelector(
      'textarea'
    ) as HTMLTextAreaElement;

    const alturaMaxima = 200;

    textarea.style.height = '0';
    const alturaConteudo = textarea.scrollHeight;

    const novaAltura = Math.min(alturaConteudo, alturaMaxima);
    this.textareaWrapper.nativeElement.style.height = novaAltura + 'px';

    textarea.style.height = novaAltura + 'px';
  }

  /*
  enviarMensagemTexto() {
    this.InstanceService.enviarText(this.mensagem, this.nomeInstancia).subscribe({
      next: (response) => {
      },
      error: err => {
        console.log("Erro ao enviar mensagem", err)
      }
    })
  }*/

  enviarVariasMensagemTexto() {
    this.msgsEnviadas.push(this.mensagem.textMessage.text)
    for (let i = 0; i < this.contatosAtivos.length; i++) {
      var numero = (this.contatosAtivos.at(i).numero);
      this.mensagem.number = (this.setFormatoNumero(numero))
      console.log(this.mensagem.number)
      //this.enviarMensagemTexto()
    }
    const checkbox = document.getElementById("selectTodos") as HTMLInputElement;
    if (checkbox.checked) {
      checkbox.checked = false
    }
    this.contatosAtivos.splice(0, this.contatosAtivos.length);
  }


  setFormatoNumero(destinatario: String) {
    destinatario = destinatario.replaceAll(".", "");
    destinatario = destinatario.replaceAll("-", "");
    destinatario = destinatario.replaceAll("(", "");
    destinatario = destinatario.replaceAll(")", "");
    destinatario = destinatario.replaceAll(" ", "");
    if (destinatario.length == 9) {
      destinatario = "63" + destinatario
    }
    //this.mensagem.number = "55" + destinatario;
    return ("55" + destinatario)
  }

  updateContatosAtivos(contatosAtivos: ContatoModel[]) {
    this.contatosAtivos = []
    this.contatosAtivos = contatosAtivos;
    console.log(this.contatosAtivos);
  }

  nenhumContatoSelecionado() {
    if (this.contatosAtivos.length == 0) {
      return true
    }
    else return false
  }
}

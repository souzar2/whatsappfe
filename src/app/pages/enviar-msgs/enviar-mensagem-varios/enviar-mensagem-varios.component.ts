import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InstanceModel } from 'src/app/models/instance.model';
import { MessageModel } from 'src/app/models/message.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ActivatedRoute } from '@angular/router';
import { ContatoModel } from 'src/app/models/contato.model';
import { ContatoFormatoService } from 'src/app/services/functions/contato.formato.service';
import { AudioRecorderService } from '../midia.service/audio.recorder.service';

@Component({
  selector: 'app-enviar-mensagem-varios',
  templateUrl: './enviar-mensagem-varios.component.html',
  styleUrls: ['./enviar-mensagem-varios.component.sass']
})

export class EnviarMensagemVariosComponent implements OnInit {
  mensagem: MessageModel = new MessageModel();
  msgsEnviadas: Array<string> = new Array();
  nomeInstancia: string;
  
  private imgBase64String: String = "";
  
  @ViewChild('textareaWrapper') textareaWrapper!: ElementRef;
  @Input() instance: string;
  @Input() contatosAtivos: Array<ContatoModel> = new Array();
  @Input() contato: ContatoModel;


  constructor(private InstanceService: InstanceService, 
    private AudioRecorderService: AudioRecorderService, 
    private activatedRoute: ActivatedRoute,
    private ContatoFormatoService: ContatoFormatoService) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.nomeInstancia = params.get("instance");
    })
    this.mensagem.start();
    this.AudioRecorderService.audioConfig();
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
      this.mensagem.number = (this.ContatoFormatoService.setFormatoNumero(numero))
      console.log(this.mensagem.number)
      //this.enviarMensagemTexto()
    }
    const checkbox = document.getElementById("selectTodos") as HTMLInputElement;
    if (checkbox.checked) {
      checkbox.checked = false
    }
    this.contatosAtivos.splice(0, this.contatosAtivos.length);
  }

  
  EscolherImg(evt) {
    var arquivoImagem = evt.target.files;
    var arquivo = arquivoImagem[0];

    if (arquivoImagem && arquivo) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(arquivo);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.imgBase64String = btoa(binaryString);
    this.mensagem.mediaMessage.media = this.imgBase64String
    this.mensagem.mediaMessage.caption = "Foto enviada"
    this.enviarImagem()
  }

  enviarImagem() {
    this.mensagem.number = this.ContatoFormatoService.setFormatoNumero(this.contato.numero);
    this.InstanceService.enviarImgBase64(this.mensagem, this.instance).subscribe({
      next: (response) => {
      },
      error: err => {
        console.log("Erro ao enviar mensagem", err)
      }
    })
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

  gravarAudio() {
    this.mensagem.number = this.ContatoFormatoService.setFormatoNumero(this.contato.numero);
    this.AudioRecorderService.setAtributosEnvio(this.instance, this.mensagem)
    this.AudioRecorderService.gravarAudio()
  }
}

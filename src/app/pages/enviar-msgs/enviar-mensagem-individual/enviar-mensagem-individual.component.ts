import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MessageModel } from 'src/app/models/message.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ActivatedRoute } from '@angular/router';
import { ContatoModel } from 'src/app/models/contato.model';
import { ChatModel } from 'src/app/models/chat.model';
import { AudioRecorderService } from '../midia.service/audio.recorder.service';
import { ContatoFormatoService } from 'src/app/services/functions/contato.formato.service';
import { ModalEnviarImagemComponent } from 'src/app/modal/enviar-imagem/enviar-imagem.component';
import { ModalService } from 'src/app/services/modal.service';
import { InstanceModel } from 'src/app/models/instance.model';

@Component({
  selector: 'app-enviar-mensagem-individual',
  templateUrl: './enviar-mensagem-individual.component.html',
  styleUrls: ['./enviar-mensagem-individual.component.sass']
})
export class EnviarMensagemIndividualComponent {
  gravadorMidia: any;
  chunks = [];
  audioFiles = [];
  audioBase64: any;

  @ViewChild('textareaWrapper') textareaWrapper!: ElementRef;

  @Input() instance: string;
  @Input() contato: ContatoModel;

  mensagem: MessageModel = new MessageModel();

  chat: Array<ChatModel> = new Array();

  imgsChat: {} = {};

  chatSelecionado: Array<ChatModel> = new Array();

  private imgBase64String: String = "";

  constructor(private InstanceService: InstanceService, 
    private AudioRecorderService: AudioRecorderService, 
    private ContatoFormatoService: ContatoFormatoService,
    private ModalService: ModalService) {
  }

  ngOnInit() {
    this.mensagem.start();
    this.chat = []
    this.showMessages();
    this.AudioRecorderService.audioConfig();

  }

  enviar(){
    if(this.mensagem.mediaMessage.media!=undefined){
      this.enviarImagem()
    }
    else{
      this.enviarMensagemTexto()
    }
  }

  enviarMensagemTexto() {
    this.mensagem.number = this.ContatoFormatoService.setFormatoNumero(this.contato.numero);
    this.InstanceService.enviarText(this.mensagem, this.instance).subscribe({
      next: (response) => {
      },
      error: err => {
        console.log("Erro ao enviar mensagem", err)
      }
    })
    this.showMessages()
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
    this.chat = []
    this.showMessages()
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
    this.mensagem.mediaMessage.caption = "Envio de video"
    console.log(this.mensagem.mediaMessage.media);
    
    //this.enviarImagem()
    //this.showMessages()
  }

  
  
  /*
    enviarVariasMensagemTexto() {
      this.mensagem.number = this.setFormatoNumero(this.contato.numero);
      this.enviarMensagemTexto();
  
      const checkbox = document.getElementById("selectTodos") as HTMLInputElement;
      if (checkbox.checked) {
        checkbox.checked = false
      }
      this.getMessages()
    }*/

  nenhumContatoSelecionado() {
    if (this.contato == undefined) {
      return true
    }
    else return false
  }

  /*
    setWH() {
    this.InstanceService.setWebHook(this.instance).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: err => {
        console.log("Erro ao criar WebHook", err)
      }
    })}
    */


  getMessages(): Promise<ChatModel[]> {
    return new Promise((resolve, reject) => {
      //console.log(this.instance);
      this.InstanceService.getMensagensBanco().subscribe({
        next: (response) => {
          resolve(response)
        },
        error: err => {
          console.log("Erro ao procurar mensagens", err)
        }
      })
    });
  }

  async showMessages() {
    this.chat = await this.getMessages();

    this.separaFromMe();
    /*
        this.chat.sort((a, b) => a.messageTimestamp - b.messageTimestamp);
        console.log(this.chat);*/
  }

  getImagemBase64FromId(msg: ChatModel) {
    this.InstanceService.getMidia64(this.instance, msg).subscribe({
      next: (response) => {
        this.imgsChat[msg.id] = response
      },
      error: err => {
        console.log("Erro ao encontrar Imagem", err)
      }
    });
  }

  getMidia(id: string): string | undefined {
    if(Object.keys(this.imgsChat).includes(id)) {
      return this.imgsChat[id].base64;
    } else {
      return undefined;
    }
  }

   separaFromMe() {
    for (let i = 0; i < this.chat.length; i++) {
      if (this.chat.at(i).remoteJid == this.ContatoFormatoService.tratarNumero(this.contato.numero) + "@s.whatsapp.net") {
        console.log(this.chat.at(i));
        this.chatSelecionado.push(this.chat.at(i))
      }
    }
    this.chatSelecionado.forEach(item => {
      if (item.messageType == "stickerMessage" || item.messageType == "imageMessage" || item.messageType == "audioMessage") {
        this.getImagemBase64FromId(item)
      }
      item.messageTimestamp = new Date(item.messageTimestamp)
    })
  }

  gravarAudio() {
    this.mensagem.number = this.ContatoFormatoService.setFormatoNumero(this.contato.numero);
    this.AudioRecorderService.setAtributosEnvio(this.instance, this.mensagem)
    this.AudioRecorderService.gravarAudio()
  }

  gravando(){
    if(this.AudioRecorderService.gravadorMidia.state == "recording"){
      return true;
    }
    else{
      return false;
    }
  }
}

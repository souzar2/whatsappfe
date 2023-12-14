import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { InstanceModel } from 'src/app/models/instance.model';
import { MessageModel } from 'src/app/models/message.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ActivatedRoute } from '@angular/router';
import { ContatoModel } from 'src/app/models/contato.model';
import { ChatModel } from 'src/app/models/chat.model';
import { DomSanitizer } from '@angular/platform-browser';

declare var MediaRecorder: any;

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

  constructor(private InstanceService: InstanceService, private activatedRoute: ActivatedRoute, private cd: ChangeDetectorRef, private dom: DomSanitizer) {

  }

  ngOnInit() {
    this.mensagem.start();
    this.chat = []
    this.showMessages();
    this.audioConfig();

  }

  receberInformacao(categoria) {
    this.contato = categoria.contatosAtivos
  }


  enviarMensagemTexto() {
    this.mensagem.number = this.setFormatoNumero(this.contato.numero);
    this.InstanceService.enviarText(this.mensagem, this.instance).subscribe({
      next: (response) => {
      },
      error: err => {
        console.log("Erro ao enviar mensagem", err)
      }
    })
    this.showMessages()
  }

  enviarAudio() {
    this.mensagem.number = this.setFormatoNumero(this.contato.numero);

    this.InstanceService.enviarAudioBase64(this.mensagem, this.instance).subscribe({
      next: (response) => {
      },

      error: err => {
        console.log("Erro ao enviar audio", err)
      }
    })
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
    console.log(this.imgBase64String);

    this.mensagem.mediaMessage.media = this.imgBase64String
    this.mensagem.mediaMessage.caption = "Envio de video"
    this.enviarImagem()
  }

  enviarImagem() {
    this.mensagem.number = this.setFormatoNumero(this.contato.numero);
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
    })
  }*/


  getMessages(): Promise<ChatModel[]> {
    return new Promise((resolve, reject) => {
      //console.log(this.instance);
      this.InstanceService.getMensagens(this.instance).subscribe({
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
      if (this.chat.at(i).remoteJid == this.tratarNumero(this.contato.numero) + "@s.whatsapp.net") {
        this.chatSelecionado.push(this.chat.at(i))
      }
    }
    this.chatSelecionado.forEach(item => {
      if (item.messageType == "stickerMessage" || item.messageType == "imageMessage" || item.messageType == "audioMessage") {
        this.getImagemBase64FromId(item)
        //item.midia = this.imgsChat['item.id']['base64'] 
        //console.log(item.midia);
        //console.log(item.midia);
      }
      if (item.pushName == "") {
        item.messageTimestamp = item.messageTimestamp.low
      }
      item.messageTimestamp = new Date(item.messageTimestamp * 1000)
    })
  }

  tratarNumero(num: string) {
    if (num.length == 11 && num.startsWith("639")) {
      return num.replace("639", "5563")
    }
    else {
      if (num.length == 13 && num.startsWith("55639")) {
        return num.replace("55639", "5563")
      }

      else {
        return ("55" + num)
      }
    }
  }


  audioConfig() {
    var nav = <any>navigator;

    nav.getUserMedia(
      { audio: true },
      gravacao => {

        console.log(gravacao);
        this.gravadorMidia = new MediaRecorder(gravacao);

        this.gravadorMidia.onstop = e => {
          var blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' });

          var lerDado = new FileReader();
          lerDado.readAsDataURL(blob);

          lerDado.onloadend = () => {
            const base64data = lerDado.result;
            console.log(base64data);
            this.mensagem.audioBase64 =(base64data as string).replaceAll("data:audio/ogg; codecs=opus;base64,", "");

            console.log(this.mensagem.audioBase64);
            this.enviarAudio();
          }

    
          //this.enviarAudio()
          
          this.chunks = [];
          var audioURL = URL.createObjectURL(blob);
          // audio.src = audioURL;
          this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
          console.log(audioURL);
          this.cd.detectChanges();
        };

        this.gravadorMidia.ondataavailable = e => {
          this.chunks.push(e.data);
        };
      },
      () => {
        alert('Error capturing audio.');
      },
    );

  }

  gravarAudio() {
    if (this.gravadorMidia.state == "recording") {
      this.gravadorMidia.stop();
      console.log('recorder stopped');
      //this.getAudioB64(this.chunks)
      //console.log(aud);
      

    }

    else {
      this.gravadorMidia.start();
      console.log(this.gravadorMidia.state);
      console.log('recorder started');
    }
  }
}

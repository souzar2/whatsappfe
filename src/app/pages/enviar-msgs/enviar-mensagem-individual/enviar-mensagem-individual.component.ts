import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InstanceModel } from 'src/app/models/instance.model';
import { MessageModel } from 'src/app/models/message.model';
import { InstanceService } from 'src/app/services/instance.service';
import { ActivatedRoute } from '@angular/router';
import { ContatoModel } from 'src/app/models/contato.model';
import { ChatModel } from 'src/app/models/chat.model';

@Component({
  selector: 'app-enviar-mensagem-individual',
  templateUrl: './enviar-mensagem-individual.component.html',
  styleUrls: ['./enviar-mensagem-individual.component.sass']
})
export class EnviarMensagemIndividualComponent {
  mensagem: MessageModel = new MessageModel();

  chat: Array<ChatModel> = new Array();

  chatSelecionado: Array<ChatModel> = new Array();

  nomeInstancia: string;
  @ViewChild('textareaWrapper') textareaWrapper!: ElementRef;
  @Input() Instance: InstanceModel;

  @Input() contato: ContatoModel;


  constructor(private InstanceService: InstanceService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.nomeInstancia = params.get("instance");
    })
    this.mensagem.start();

    this.showMessages();
    
  }

  receberInformacao(categoria) {
    this.contato = categoria.contatosAtivos
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

 
  enviarMensagemTexto() {
    this.InstanceService.enviarText(this.mensagem, this.nomeInstancia).subscribe({
      next: (response) => {
      },
      error: err => {
        console.log("Erro ao enviar mensagem", err)
      }
    })
  }

  enviarVariasMensagemTexto() {
    this.mensagem.number = this.setFormatoNumero(this.contato.numero);
    console.log(this.mensagem.number)
    this.enviarMensagemTexto();

    const checkbox = document.getElementById("selectTodos") as HTMLInputElement;
    if (checkbox.checked) {
      checkbox.checked = false
    }
    this.getMessages()
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

  nenhumContatoSelecionado() {
    if (this.contato == undefined) {
      return true
    }
    else return false
  }

  setWH() {
    this.InstanceService.setWebHook(this.Instance).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: err => {
        console.log("Erro ao criar WebHook", err)
      }
    })
  }

  resposta: boolean

  fromMe() {
   
    return this.resposta
  }

  getMessages(): Promise<ChatModel[]> {
    return new Promise((resolve, reject) => {
      this.InstanceService.getMensagens(this.Instance).subscribe({
        next: (response) => {
          resolve(
            response.map((item) => {
              return {
                remoteJid: item.key.remoteJid,
                fromMe: item.key.fromMe,
                id: item.key.id,
                pushName: item.pushName,
                message: item.message,
                messageType: item.messageType,
                messageTimestamp: new Date(item.messageTimestamp*1000),
                imagemBase64: item.message.imagemBase64
                
                
              } as ChatModel;
            })
          );
          
        },
        error: err => {
          console.log("Erro ao procurar clientes", err)
        }
    })
  });
}

async showMessages() {
  this.chat = await this.getMessages();

 /* for(let i=0; i < this.chat.length; i++){
    if(this.chat.at(i).messageType == "conversation"){
      this.chat.at(i).text = this.chat.at(i).message.conversation
    }
    else{
      if(this.chat.at(i).messageType == "extendedTextMessage"){
        this.chat.at(i).text = this.chat.at(i).message.extendedTextMessage.text
      }
      else{
        if(this.chat.at(i).messageType == "imageMessage"){
          this.chat.at(i).imagemBase64 = 'data:image/jpg;base64,' + this.chat.at(i).message.base64;
        }
        if(this.chat.at(i).messageType == "stickerMessage"){
          this.chat.at(i).text = "Sticker img";
        }
        else{
          this.chat.at(i).text = "Arquivo"
        }
      }
    }
  }*/

  this.chat.forEach(item => {
    this.separaTipoMsg(item);
  })
  
  this.separaFromMe();
}

separaTipoMsg(msg: ChatModel) {
  switch(msg.messageType) {
      case "conversation":
        msg.text = msg.message.conversation;
      case "extendedTextMessage":
        msg.text = msg.message.extendedTextMessage.text;
      case "imageMessage":
        msg.text = msg.message.base64;
      case "stickerMessage":
        msg.text =  "Sticker img";
      default: msg.text = "Arquivo";
  }
}

separaFromMe() {
  for(let i=0; i<this.chat.length; i++){
    if(this.chat.at(i).remoteJid == this.tratarNumero(this.contato.numero)+"@s.whatsapp.net"){
     this.chatSelecionado.push(this.chat.at(i))
    }
  }
}

tratarNumero(num: string){
  if (num.length == 11 && num.startsWith("639")){
    return num.replace("639", "5563")
  }
  else{
    if (num.length == 13 && num.startsWith("55639")){
      return num.replace("55639", "5563")
    }
  
  else{
    return("55"+num)
  }}
}

/*


 getClientes(quantidadeContatos: number, pesquisa: string): Promise<ContatoModel[]> {
    return new Promise((resolve, reject) => {
      this.clienteService.getClientes(this.pagina, quantidadeContatos, pesquisa).subscribe({
        next: (response) => {
          resolve(
            response.map((item) => {
              return {
                id: item.id,
                nome: item.nome,
                numero: item.celular1
              } as ContatoModel;
            })
          );
        },
        error: err => {
          console.log("Erro ao procurar clientes", err)
        }
      })
    });
  }

  showMessages() {
    this.InstanceService.getMensagens(this.Instance).subscribe({
      next: (response) => {
        this.setWH()
        console.log(response);
        for (let i = 0; i < 11; i++) {
          this.resposta = response.at(i).key.fromMe
          if (response.at(i).messageType == "conversation") {
            this.chat.push(response.at(i).message.conversation)
          }
          else {
            if (response.at(i).messageType == "extendedTextMessage") {
              this.chat.push(response.at(i).message.extendedTextMessage.text)
            }
          }
        }
      },
      error: err => {
        console.log("Erro ao obter mensagens", err)
      }
    })
  }* */

 


}

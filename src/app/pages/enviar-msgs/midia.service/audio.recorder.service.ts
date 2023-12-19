
import { OnInit, Injectable  } from '@angular/core';
import { InstanceService } from 'src/app/services/instance.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageModel } from 'src/app/models/message.model';

declare var MediaRecorder: any;

@Injectable({
    providedIn: 'root'
})

export class AudioRecorderService {

    mensagem: MessageModel;
    instancia: string;

    gravadorMidia: any;
    chunks = [];
    audioFiles = [];
    audioBase64: any;

    constructor(private InstanceService: InstanceService, private dom: DomSanitizer) {  }
    
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
                        this.mensagem.audioBase64 = (base64data as string).replaceAll("data:audio/ogg; codecs=opus;base64,", "");
                        
                        this.enviarAudio()
                        
                    }
                    this.chunks = [];
                    var audioURL = URL.createObjectURL(blob);
                    this.audioFiles.push(this.dom.bypassSecurityTrustUrl(audioURL));
                    console.log(audioURL);
                };
                this.gravadorMidia.ondataavailable = e => {
                    this.chunks.push(e.data);
                };
            },
            () => {
                alert('Sem parmissão para utilizar o microfone.');
            },
        );

    }

    gravarAudio() {
        if (this.gravadorMidia.state == "recording") {
            this.gravadorMidia.stop();
            console.log('recorder stopped');
        }
        else {
            this.gravadorMidia.start();
            console.log(this.gravadorMidia.state);
            console.log('recorder started');
        }
    }

    setAtributosEnvio(instancia: string, mensagem: MessageModel){
        this.mensagem = mensagem
        this.instancia = instancia
    }

    enviarAudio() {
        this.InstanceService.enviarAudioBase64(this.mensagem, this.instancia).subscribe({
          next: (response) => {
          },
          error: err => {
            console.log("Erro ao enviar audio", err)
          }
        })
      }
}

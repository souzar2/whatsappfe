
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class AudioRecorderService {

    gravadorMidia: any;
    chunks = [];
    audioFiles = [];
    audioBase64: any;

    constructor(private cd: ChangeDetectorRef, private dom: DomSanitizer) { 

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
                    }
                    this.chunks = [];
                    var audioURL = URL.createObjectURL(blob);
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
        }
        else {
            this.gravadorMidia.start();
            console.log(this.gravadorMidia.state);
            console.log('recorder started');
        }
    }

}

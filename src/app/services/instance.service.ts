import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { InstanceModel } from '../models/instance.model';
import { enviroment } from 'src/environments/environment';
import { MessageModel } from '../models/message.model';
import { AuthService } from './authorization/auth.service';
import { ChatModel } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) { }
  
  listarIntancias() : Observable<any>{
    console.log(this.auth.getHeaders());
    
    return this.http.get(`${enviroment.apiUrl}fetchInstances/`, { headers: this.auth.getHeaders()});
  }
  novaInstancia(instancia: InstanceModel) : Observable<any>{
    return this.http.post(`${enviroment.apiUrl}createInstance/`, instancia, { headers: this.auth.getHeaders()});
  }
  removerInstancia(nomeInstancia: string) : Observable<any>{
    return this.http.delete(`${enviroment.apiUrl}deleteInstance/${nomeInstancia}`, { headers: this.auth.getHeaders()});
  }

  desconectarInstancia(nomeInstancia: string) : Observable<any>{
    return this.http.delete(`${enviroment.apiUrl}logoutInstance/${nomeInstancia}`, { headers: this.auth.getHeaders()});
  }

  reconectarQrCode(nomeInstancia: string) : Observable<any>{
    return this.http.get(`${enviroment.apiUrl}reconnectInstance?instance=${nomeInstancia}`, { headers: this.auth.getHeaders()});
  }

  enviarText(mensagem: MessageModel, instanceName: string) : Observable<any>{
    return this.http.post(`${enviroment.apiUrl}sendMessageText/${instanceName}`, mensagem, { headers: this.auth.getHeaders()});
  }

  enviarImgBase64(mensagem: MessageModel, instanceName: string) : Observable<any>{
    return this.http.post(`${enviroment.apiUrl}sendImgBase64/${instanceName}`, mensagem, { headers: this.auth.getHeaders()});
  }

  enviarAudioBase64(mensagem: MessageModel, instanceName: string) : Observable<any>{
    return this.http.post(`${enviroment.apiUrl}sendVoiceAudio/${instanceName}`, mensagem, { headers: this.auth.getHeaders()});
  }

  setWebHook(instancia: string) : Observable<any>{
    return this.http.post(`${enviroment.apiUrl}setwebhook/${instancia}`, {}, { headers: this.auth.getHeaders()});
  }

  getMensagens(instancia: string) : Observable<any>{
    return this.http.post(`${enviroment.apiUrl}getmessages/${instancia}`, {},  { headers: this.auth.getHeaders()});
  }
  /*
  getMidia64(instancia: InstanceModel, id: string) : Observable<any>{
    return this.http.post(`http://localhost:3000/conexao/getBase64MediaMessage/wU7RnbZjkmpdZuO`,instancia, { headers: this.auth.getHeaders(), "id": id});
  }
 */

  getMidia64(instancia: string, msg: ChatModel) : Observable<any>{
    return this.http.post(`${enviroment.apiUrl}getBase64MediaMessage/${instancia}`, msg, {headers: this.auth.getHeaders()});
  }


}

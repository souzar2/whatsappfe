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
    console.log(mensagem)
    return this.http.post(`${enviroment.apiUrl}sendMessageText/${instanceName}`, mensagem, { headers: this.auth.getHeaders()});
  }

  setWebHook(instancia: InstanceModel) : Observable<any>{
    return this.http.post(`http://localhost:3000/conexao/setwebhook/wU7RnbZjkmpdZuO`,instancia,  { headers: this.auth.getHeaders()});
  }

  getMensagens(instancia: InstanceModel) : Observable<any>{
    return this.http.post(`http://localhost:3000/conexao/getmessages/wU7RnbZjkmpdZuO`,instancia,  { headers: this.auth.getHeaders()});
  }

}

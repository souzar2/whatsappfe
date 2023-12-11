import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from './authorization/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  loginUsuario(usuario: UsuarioModel): Observable<any> {
    return this.http.post(`http://localhost:3000/login`, usuario);
  }

  /*
   enviarText(mensagem: MessageModel, instanceName: string) : Observable<any>{
      return this.http.post(`${enviroment.apiUrl}sendMessageText/${instanceName}`, mensagem);
    }
    * */

}
import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private onUserAutenticated: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient, 
    private jwtHelper: JwtHelperService, 
    private router: Router,
  ) {}

  public getHeaders() {
    return {"Authorization": this.getAuthentication()}
  }


  public getAuthentication(): string{
    if(this.isAuthenticated()) {
      
      return localStorage.getItem('token');
    } else {
      this.logout();
    }
    return undefined;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if(token == null) {
      return false;
    }

    try {
      if(this.jwtHelper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      } else {
        return true;
      }
    } catch {
      // console.log('Invalid Token');
      localStorage.clear();
      return false;
    }
  }

  public logout() {
    localStorage.clear();
    this.onUserAutenticated.emit(false);
    this.router.navigate(['login']);
  }

  /**
   * Chama model para autenticação de usuário
   * @returns promise com usuário autenticado
   
  public async autenticate() : Promise<UsuarioModel | undefined> {
    return this.user.loginUsuario(AuthenticateComponent, ).result.catch(() => {
        console.debug('Autenticação Cancelada');
      });
  }*/
}

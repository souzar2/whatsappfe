import { Component } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/authorization/auth.service';
import { InstanceService } from 'src/app/services/instance.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  usuario: UsuarioModel = new UsuarioModel();
  login: Array<any> = new Array();
  token: string
  instance: string

  constructor(private UserService: UserService, private AuthService: AuthService, private InstanceService: InstanceService) {

  }

  ngOnInit() {
   
  }

  entrar() {
    this.UserService.loginUsuario(this.usuario).subscribe({
      next: (response) => {
        this.token = response.token;
        localStorage.setItem("token", this.token)
      },
    error: err => {
        console.log("Erro ao fazer login", err)
      }
  })
}

isAuthenticated(){
  return this.AuthService.isAuthenticated();
}

}



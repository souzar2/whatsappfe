class Login {
    login: string;
}

class Senha {
    senha: string;
}




export class UsuarioModel{
    login: Login
    senha: Senha;

    start() {
        this.login = new Login();
        this.senha = new Senha();
    }
}

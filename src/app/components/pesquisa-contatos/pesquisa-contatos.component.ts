import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContatoModel } from 'src/app/models/contato.model';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-pesquisa-contatos',
  templateUrl: './pesquisa-contatos.component.html',
  styleUrls: ['./pesquisa-contatos.component.sass']
})
export class PesquisaContatosComponent {
  
  clientesPaginados: Array<ContatoModel> = new Array();
  contatosAtivos: Array<ContatoModel> = new Array();

  todosClientes: Array<ContatoModel> = new Array();

  pagina = 1;

  contatoPesquisa = '';

  nomeInstancia: string;
  msgsEnviadas: Array<string> = new Array();
  
  @Output() contatosAtivosChange = new EventEmitter<ContatoModel[]>();


  constructor(private clienteService: ClienteService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
  }

  /*emitContatosAtivosEvent() {
    this.contatosAtivosChange.emit(this.contatosAtivos);
  }*/

  async onValorChange() {
    this.clientesPaginados = await this.getClientes(25, this.contatoPesquisa)
  }

  /*
  getClientesPaginados(): Promise<ContatoModel[]> {
    return new Promise((resolve, reject) => {
    this.clienteService.getClientes(this.pagina, 20, this.contatoPesquisa).subscribe({
      next: (response) => {
          this.clientesPaginados = response.map((item) => {
            return {
              id: item.id,
              nome: item.nome,
              numero: item.celular1
            } as ContatoModel;
          })
      },
      error: err => {
        console.log("Erro ao procurar clientes", err)
      }
    })
  });
  }
  */

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

  async selecionarContato(indexContato: number) {
    const ativoIndex = this.contatosAtivos.findIndex((item) => this.clientesPaginados[indexContato].id == item.id);

    const checkbox = document.getElementById("selectTodos") as HTMLInputElement;
    if (ativoIndex != -1) {
      this.contatosAtivos.splice(ativoIndex, 1)
      if (checkbox.checked) {
        checkbox.checked = false
      }
    } else {
      this.contatosAtivos.push(this.clientesPaginados[indexContato]);
      let todosContatos = (await this.getClientes(0, '')).length;
      if (this.contatosAtivos.length == todosContatos) {
        checkbox.checked = true
      }
    }
    this.contatosAtivosChange.emit(this.contatosAtivos);
  }

  async selecionarTodosContatos() {
    let todosContatos = await this.getClientes(0, '');

    const checkbox = document.getElementById("selectTodos") as HTMLInputElement;
    if (checkbox.checked) {
      this.contatosAtivos = todosContatos;
    } else {
      this.contatosAtivos = [];
    }
    this.contatosAtivosChange.emit(this.contatosAtivos);
    //this.emitContatosAtivosEvent();
  }

  async onBottomAlcancado(){
    let novosClientes: Array<ContatoModel> = new Array();
    
    novosClientes = await this.getClientes(25, this.contatoPesquisa)

    for (let i=0;i<novosClientes.length;i++){
       this.clientesPaginados.push(novosClientes.at(i))
    }
   
    this.pagina+=1;
    
  }

  numeroSelecionado(contato: ContatoModel): boolean {
    if (this.contatosAtivos.find(
      item => item.id == contato.id
    )) {
      return true
    }
    else {
      return false
    }
  }

  mascaraNumero(telefone: string) {

    telefone = telefone.replaceAll(".", "");
    telefone = telefone.replaceAll("-", "");
    telefone = telefone.replaceAll("(", "");
    telefone = telefone.replaceAll(")", "");
    telefone = telefone.replaceAll(" ", "");

    if (telefone.length <= 9) {
      telefone = telefone.substring(0, telefone.length - 4) + "-" + telefone.substring(telefone.length - 4, telefone.length)
      return "(63)" + telefone
    } else {
      if (telefone.length == 11) {
        telefone = telefone.substring(0, telefone.length - 4) + "-" + telefone.substring(telefone.length - 4, telefone.length)

        return "(" + telefone.substring(0, 2) + ")" + telefone.substring(2, telefone.length)

      }
      else {
        if (telefone.length == 10) {
          telefone = "(" + telefone.substring(0, 2) + ")" + telefone.substring(2, telefone.length)
          telefone = telefone.substring(0, telefone.length - 4) + "-" + telefone.substring(telefone.length - 4, telefone.length)
          return telefone
        }
      }
      return telefone
    }
  }

  mascaraNome(nomeContato: string) {
    nomeContato = nomeContato.replaceAll(" DO ", " ");
    nomeContato = nomeContato.replaceAll(" DA ", " ");
    nomeContato = nomeContato.replaceAll(" DE ", " ");
    nomeContato = nomeContato.replaceAll(" E ", " ");

    if (nomeContato.length >= 40) {
      nomeContato = nomeContato.substring(0, nomeContato.lastIndexOf(" "))
      nomeContato = nomeContato.substring(0, nomeContato.lastIndexOf(" "))
      nomeContato = nomeContato.substring(0, nomeContato.lastIndexOf(" "))
      return nomeContato
    } else {
      if (nomeContato.length >= 28) {
        nomeContato = nomeContato.substring(0, nomeContato.lastIndexOf(" "))
        nomeContato = nomeContato.substring(0, nomeContato.lastIndexOf(" "))
        return nomeContato
      }
    }
    return nomeContato
  }
}
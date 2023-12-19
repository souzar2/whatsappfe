import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContatoModel } from 'src/app/models/contato.model';
import { ClienteService } from 'src/app/services/clientes.service';
import { ContatoFormatoService } from 'src/app/services/functions/contato.formato.service';

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


  constructor(private clienteService: ClienteService, 
    private activatedRoute: ActivatedRoute,
    private ContatoFormatoService: ContatoFormatoService) {}

  ngOnInit() {
  }

  /*emitContatosAtivosEvent() {
    this.contatosAtivosChange.emit(this.contatosAtivos);
  }*/

  async onValorChange() {
    this.pagina=1
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
    if(this.contatoPesquisa==""){
    let novosClientes: Array<ContatoModel> = new Array();
    novosClientes = await this.getClientes(25, this.contatoPesquisa)

    for (let i=0;i<novosClientes.length;i++){
       this.clientesPaginados.push(novosClientes.at(i))
    }
   
    this.pagina+=1;}
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
    return this.ContatoFormatoService.mascaraNumero(telefone);
  }

  mascaraNome(nomeContato: string) {
    return this.ContatoFormatoService.mascaraNome(nomeContato)
  }
}
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ContatoFormatoService {
    
    constructor() {  }


    tratarNumero(num: string) {
        if (num.length == 11 && num.startsWith("639")) {
          return num.replace("639", "5563")
        }
        else {
          if (num.length == 13 && num.startsWith("55639")) {
            return num.replace("55639", "5563")
          }
    
          else {
            return ("55" + num)
          }
        }
      }

      setFormatoNumero(destinatario: String) {
        destinatario = destinatario.replaceAll(".", "");
        destinatario = destinatario.replaceAll("-", "");
        destinatario = destinatario.replaceAll("(", "");
        destinatario = destinatario.replaceAll(")", "");
        destinatario = destinatario.replaceAll(" ", "");
        if (destinatario.length == 9) {
          destinatario = "63" + destinatario
        }
        //this.mensagem.number = "55" + destinatario;
        return ("55" + destinatario)
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
        nomeContato = nomeContato.replaceAll(" DOS ", " ");
        nomeContato = nomeContato.replaceAll(" DAS ", " ");
    
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
    
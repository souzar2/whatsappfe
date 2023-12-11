import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

/** Serviço para utilizar o componente NgbModal para abrir modals, 
 * passando os dados facilmente para o componente aberto na modal
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private ngbModalService: NgbModal) { }

  open(component: any, data: {}, options?: NgbModalOptions): NgbModalRef {
    if(options == undefined) {
      options = new Object
    }

    // definindo configurações globais para as modals
    options.centered = true;
    options.backdrop = 'static';
    options.keyboard = false;

    // Abrindo modal
    const activeModal = this.ngbModalService.open(component, options);

    // Definindo dados de entrada passados
    activeModal.componentInstance.modalRef = activeModal;

    Object.keys(data).forEach((dataKey: string) => {
      activeModal.componentInstance[dataKey] = data[dataKey];
    })

    return activeModal;
  }

  
}

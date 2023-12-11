import { Component, Input } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from 'src/app/services/authorization/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent {
  modalRef: NgbModalRef;
  constructor(private AuthService: AuthService) { }

  ngOnInit() {

  }

  fecharModal() {
    this.modalRef.close();
  }


  sair(){
    this.AuthService.logout()
    this.fecharModal()
  }
}
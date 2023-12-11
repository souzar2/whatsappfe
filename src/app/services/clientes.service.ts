
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './authorization/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    constructor(
        private http: HttpClient,
        private auth: AuthService
        ) { }
    getClientes(page:number, pgsize:number, nomePesquisa:string): Observable<any> {
        return this.http.post(`http://localhost:3000/clientes`, { headers: this.auth.getHeaders(), "page": page,  "pageSize":pgsize, "pesquisaNome": nomePesquisa});
    }
}
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConexaoComponent } from './pages/conexao/conexao.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InstanceService } from './services/instance.service';
import { ModalQrcodeComponent } from './modal/modal-qrcode/modal-qrcode.component';
import { ReconnectQrcodeComponent } from './modal/reconnect-qrcode/reconnect-qrcode.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthService } from './services/authorization/auth.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { DesconectarInstanciaComponent } from './modal/desconectar-instancia/desconectar-instancia.component';
import { LogoutComponent } from './modal/logout/logout.component';
import { ModalExcluirInstanciaComponent } from './modal/modal-excluir-instancia/modal-excluir-instancia.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarContatosComponent } from './sidebar/sidebar-contatos/sidebar-contatos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PesquisaContatosComponent } from './components/pesquisa-contatos/pesquisa-contatos.component';
import { ReactOnViewDirective } from './directives/react-on-view.directive';
import { EnviarMensagemIndividualComponent } from './pages/enviar-msgs/enviar-mensagem-individual/enviar-mensagem-individual.component';
import { EnviarMensagemVariosComponent } from './pages/enviar-msgs/enviar-mensagem-varios/enviar-mensagem-varios.component';
import { EnviarMensagemComponent } from './pages/enviar-msgs/enviar-mensagem/enviar-mensagem.component';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';



//import { AuthInterceptor } from './services/authorization/AuthInterceptor';
//registerLocaleData(ptBr);

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    ConexaoComponent,
    ModalQrcodeComponent,
    ReconnectQrcodeComponent,
    HomeComponent,
    LoginComponent,
    DesconectarInstanciaComponent,
    LogoutComponent,
    ModalExcluirInstanciaComponent,
    SidebarContatosComponent,
    PesquisaContatosComponent,
    ReactOnViewDirective,
    EnviarMensagemIndividualComponent,
    EnviarMensagemComponent,
    EnviarMensagemVariosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    NgbPaginationModule,
    
  ],
  providers: [InstanceService, HttpClientModule, JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, {provide: LOCALE_ID, useValue: 'pt-BR'}/*, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }

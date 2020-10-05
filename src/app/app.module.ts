import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrarconsultaComponent } from './registrarconsulta/registrarconsulta.component';
import { RegistrarclienteComponent } from './registrarcliente/registrarcliente.component';
import { ListaclienteComponent } from './listacliente/listacliente.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { DatosService } from './services/datos.service';
import { AuthService } from "./services/auth.service";

import { ToastrModule} from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetallesClienteComponent } from './detalles-cliente/detalles-cliente.component';
import { VerConsultaComponent } from './ver-consulta/ver-consulta.component';
import { ModalMascotaComponent } from './modal-mascota/modal-mascota.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './login/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrarconsultaComponent,
    RegistrarclienteComponent,
    ListaclienteComponent,
    DetallesClienteComponent,
    VerConsultaComponent,
    ModalMascotaComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [DatosService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

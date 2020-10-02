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

import { DatosService } from './services/datos.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegistrarconsultaComponent,
    RegistrarclienteComponent,
    ListaclienteComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [DatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }

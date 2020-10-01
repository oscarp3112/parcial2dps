import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrarconsultaComponent } from './registrarconsulta/registrarconsulta.component';
import { RegistrarclienteComponent } from './registrarcliente/registrarcliente.component';
import { ListaclienteComponent } from './listacliente/listacliente.component';

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
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

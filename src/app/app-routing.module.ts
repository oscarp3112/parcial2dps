import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {RegistrarconsultaComponent} from './registrarconsulta/registrarconsulta.component';
import {RegistrarclienteComponent} from './registrarcliente/registrarcliente.component';
import {ListaclienteComponent} from './listacliente/listacliente.component';


const routes: Routes = [
 {path: 'regConsulta', component: RegistrarconsultaComponent},
 {path: 'regCliente', component: RegistrarclienteComponent},
 {path: 'listCliente', component: ListaclienteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

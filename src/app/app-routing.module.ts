import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {RegistrarconsultaComponent} from './registrarconsulta/registrarconsulta.component';
import {RegistrarclienteComponent} from './registrarcliente/registrarcliente.component';
import {ListaclienteComponent} from './listacliente/listacliente.component';
import {DetallesClienteComponent} from './detalles-cliente/detalles-cliente.component';
import { VerConsultaComponent } from './ver-consulta/ver-consulta.component';


const routes: Routes = [
 {path: 'regConsulta', component: RegistrarconsultaComponent},
 {path: 'regCliente', component: RegistrarclienteComponent},
 {path: 'listCliente', component: ListaclienteComponent},
 {path: 'detalles-cliente', component: DetallesClienteComponent},
 {path: 'ver-consulta', component: VerConsultaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

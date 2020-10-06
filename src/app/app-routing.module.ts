import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {RegistrarconsultaComponent} from './registrarconsulta/registrarconsulta.component';
import {RegistrarclienteComponent} from './registrarcliente/registrarcliente.component';
import {ListaclienteComponent} from './listacliente/listacliente.component';
import {DetallesClienteComponent} from './detalles-cliente/detalles-cliente.component';
import {VerConsultaComponent } from './ver-consulta/ver-consulta.component';
import {SignInComponent} from './login/sign-in/sign-in.component';
import {AuthGuard} from "./guard/auth.guard";



const routes: Routes = [
 {path: '', redirectTo: '/login', pathMatch: 'full'},
 {path: 'regConsulta', component: RegistrarconsultaComponent, canActivate: [AuthGuard]},
 {path: 'regCliente', component: RegistrarclienteComponent, canActivate: [AuthGuard]},
 {path: 'listCliente', component: ListaclienteComponent, canActivate: [AuthGuard]},
 {path: 'detalles-cliente', component: DetallesClienteComponent, canActivate: [AuthGuard]},
 {path: 'ver-consulta', component: VerConsultaComponent, canActivate: [AuthGuard]},
 {path: 'login', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';

import { Cliente } from '../models/cliente';

import { DatosService } from '../services/datos.service';

import { ToastrService } from 'ngx-toastr'
import { Mascota } from '../models/mascota';
import { Consulta } from '../models/consulta';


@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css']
})
export class DetallesClienteComponent implements OnInit {

  cliente:Cliente;
  clienteProvisional:Cliente;
  mascotas:Mascota[];
  consultas:Consulta[];

  constructor(
    private datosService:DatosService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.cliente = new Cliente;
    this.clienteProvisional = new Cliente;
    this.mascotas = [];
    this.consultas = [];

    this.clienteProvisional = JSON.parse(localStorage.getItem('cliente'));
    this.cliente = this.formatearDatos(this.clienteProvisional);
    console.log(this.cliente);
  }

  formatearDatos(x){
    this.mascotas = [];
    this.consultas = [];
    let m = Object.entries(x.mascotas).forEach(item => {
      this.mascotas.push(item[1] as Mascota);
    });
    let c = Object.entries(x.consultas).forEach(item => {
      this.consultas.push(item[1] as Consulta);
    });
    x.mascotas = this.mascotas;
    x.consultas = this.consultas;
    return x;
  }

  eliminarMascota(mascota:Mascota){
    let indice = this.cliente.mascotas.indexOf(mascota);
    this.cliente.mascotas.splice(indice,1);
    this.datosService.guardarConsulta(this.cliente);

    this.toastr.warning('Mascota Eliminada', 'La mascota se ha eliminado exitosamente',{
      progressBar: true,
      timeOut: 2000,
      closeButton: true
    });
  }

  verConsulta(consulta:Consulta){
    localStorage.setItem('consulta', JSON.stringify(consulta));
  }
}

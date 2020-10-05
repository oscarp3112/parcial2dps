import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';


import { Cliente } from '../models/cliente';

import { DatosService } from '../services/datos.service';

import { ToastrService } from 'ngx-toastr';
import { Consulta } from '../models/consulta';
import { Mascota } from '../models/mascota';

@Component({
  selector: 'app-listacliente',
  templateUrl: './listacliente.component.html',
  styleUrls: ['./listacliente.component.css']
})
export class ListaclienteComponent implements OnInit {
  //clientes registrados
  clientes:Cliente[];
  clientesFiltrados:Cliente[];
  mascotas:Mascota[];
  consultas:Consulta[];
  DUI:string;

  constructor(
    private datosService:DatosService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.datosService.obtenerDatos("Clientes").snapshotChanges().subscribe(item =>{
      this.clientesFiltrados = [];
      this.clientes = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["DUI"] = element.key;
        this.clientes.push(this.formatearDatos(x) as Cliente);
      });
      this.clientesFiltrados = this.clientes;
    });
    
    localStorage.removeItem('cliente');
    localStorage.removeItem('consulta');
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

  eliminarUsuario(dui:string){
    this.datosService.eliminarCliente(dui);
    this.toastr.warning('El cliente se ha eliminado exitosamente','Cliente Eliminado',{
      progressBar: true,
      timeOut: 2000,
      closeButton: true
    });
  }

  verDetalles(cl:Cliente){
    localStorage.setItem('cliente', JSON.stringify(cl));
  }

  buscarDUI(dui:string){
    console.log(dui);
    //console.log(this.clientes);
    if(dui) {
      this.clientesFiltrados = this.clientes.filter(function (ele, i, array) {
        let arrayelement = ele.DUI;
        return arrayelement.includes(dui);
      });
      console.log(this.clientesFiltrados);
    }else{
      this.clientesFiltrados = this.clientes;
    }
  }
}

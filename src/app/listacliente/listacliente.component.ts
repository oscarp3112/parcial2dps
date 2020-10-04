import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';


import { Cliente } from '../models/cliente';

import { DatosService } from '../services/datos.service';

import { ToastrService } from 'ngx-toastr';
import { Consulta } from '../models/consulta';

@Component({
  selector: 'app-listacliente',
  templateUrl: './listacliente.component.html',
  styleUrls: ['./listacliente.component.css']
})
export class ListaclienteComponent implements OnInit {
  //clientes registrados
  clientes:Cliente[];
  consultas:Consulta[];
  consultaProvisional:Consulta;

  constructor(
    private datosService:DatosService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.datosService.obtenerDatos("Clientes").snapshotChanges().subscribe(item =>{
      this.clientes = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["DUI"] = element.key;
        this.clientes.push(this.formatearDatos(x) as Cliente);
      });
    });
  }

  formatearDatos(x){
    this.consultas = [];
    this.consultaProvisional = new Consulta;
    let c = Object.entries(x.consultas).forEach(item => {
      this.consultaProvisional = item[1] as Consulta;

      //Con esto ignoro la primera consulta creada por defecto para que no se elimine la rama
      if(this.consultaProvisional.nombreMascota!="eliminar"){
        this.consultas.push(item[1] as Consulta);
      }
    });

    x.consultas = this.consultas;
    return x;
  }

  eliminarUsuario(dui:string){
    this.datosService.eliminarCliente(dui);
    this.toastr.warning('Registro eliminado', 'Se ha eliminado el cliente seleccionado',{
      progressBar: true,
      timeOut: 2000,
      closeButton: true
    });
  }

  verDetalles(cl:Cliente){
    localStorage.setItem('cliente', JSON.stringify(cl));
  }
}

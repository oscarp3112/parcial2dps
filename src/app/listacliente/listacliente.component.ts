import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';

import { Cliente } from '../models/cliente';
import { Consulta } from '../models/consulta';
import { Mascota } from '../models/mascota';
import { Medicamento } from '../models/medicamento';
import { Servicio } from '../models/servicio';

import { DatosService } from '../services/datos.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listacliente',
  templateUrl: './listacliente.component.html',
  styleUrls: ['./listacliente.component.css']
})
export class ListaclienteComponent implements OnInit {
  //clientes registrados
  clientes:Cliente[];

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
        this.clientes.push(x as Cliente);
      });
    });
  }

  eliminarUsuario(dui:string){
    this.datosService.eliminarCliente(dui);
  }
}

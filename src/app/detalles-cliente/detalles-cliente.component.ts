import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';


import { Cliente } from '../models/cliente';

import { DatosService } from '../services/datos.service';

import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css']
})
export class DetallesClienteComponent implements OnInit {

  clienteID:Cliente[];
  clienteCopia;
  datosCliente:Cliente[];
  constructor(
    private datosService:DatosService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.clienteID = [];
    this.clienteID = JSON.parse(localStorage.getItem('cliente'));
    this.clienteID = this.clienteID["DUI"];
    console.log(this.clienteID);

    this.datosService.obtenerDatos("Clientes/12345678-9").snapshotChanges().subscribe(item =>{
      this.datosCliente = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["DUI"] = element.key;
        this.datosCliente.push(x as Cliente);
      });
    });

    console.log(this.datosCliente);
  }
}

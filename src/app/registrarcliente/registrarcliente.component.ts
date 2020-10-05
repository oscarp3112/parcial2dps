import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { Cliente } from '../models/cliente';
import { Consulta } from '../models/consulta';
import { Mascota } from '../models/mascota';

import { DatosService } from '../services/datos.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrarcliente',
  templateUrl: './registrarcliente.component.html',
  styleUrls: ['./registrarcliente.component.css']
})
export class RegistrarclienteComponent implements OnInit {

  //Datos recibidos en el formulario
  dui:string;
  nombre:string;
  mascota:string;
  
  //Variables para registrar al cliente nuevo
  clienteNuevo:Cliente;
  mascotaNueva:Mascota;
  consultaNueva:Consulta;

  constructor(
    private servicioDatos:DatosService,
    private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.dui = "";
    this.nombre = "";
    this.mascota = "";

    this.clienteNuevo = new Cliente;
    this.clienteNuevo.mascotas = [];
    this.clienteNuevo.consultas = [];
    this.mascotaNueva = new Mascota;
    this.consultaNueva = new Consulta;

    localStorage.removeItem('cliente');
    localStorage.removeItem('consulta');
  }

  registrarCliente(){

    //Asignando valores a la mascota nueva
    this.mascotaNueva.nombre = this.mascota;
    this.mascotaNueva.consultas = 0;

    //Asignando una consulta vacia
    this.consultaNueva.nombreMascota = "eliminar";

    //Asignando valores al nuevo cliente
    //this.clienteNuevo.DUI = this.dui;
    this.clienteNuevo.nombre = this.nombre;
    this.clienteNuevo.mascotas.push(this.mascotaNueva as Mascota);
    this.clienteNuevo.consultas.push(this.consultaNueva as Consulta);

    this.servicioDatos.agregarCliente(this.dui, this.clienteNuevo);

    this.toastr.success("El cliente ha sido registrado exitosamente", "Cliente Registrado",{
      progressBar: true,
      timeOut: 2000,
      closeButton: true
    });

    this.clienteNuevo = new Cliente;
    this.clienteNuevo.mascotas = [];
    this.clienteNuevo.consultas = [];
    this.mascotaNueva = new Mascota;
    this.consultaNueva = new Consulta;
    this.dui = "";
    this.nombre = "";
    this.mascota = "";

  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { element } from 'protractor';

import { Cliente } from '../models/cliente';

import { DatosService } from '../services/datos.service';

import { ModalMascotaComponent } from '../modal-mascota/modal-mascota.component';

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

    localStorage.removeItem('consulta');
  }

  formatearDatos(x){
    this.consultas = [];
    this.mascotas = [];
    let consultaProvisional = new Consulta;
    let mascotaProvisional = new Mascota;

    let m = Object.entries(x.mascotas).forEach(item => {
      mascotaProvisional = item[1] as Mascota;
      if(mascotaProvisional.nombre != "vacio"){
        this.mascotas.push(mascotaProvisional);
      }
    });

    let c = Object.entries(x.consultas).forEach(item => {
      consultaProvisional = item[1] as Consulta;
      //Con esto ignoro la primera consulta creada por defecto para que no se elimine la rama
      if(consultaProvisional.nombreMascota!="eliminar"){
        this.consultas.push(consultaProvisional);
      }
    });

    x.mascotas = this.mascotas;
    x.consultas = this.consultas;
    return x;
  }

  eliminarMascota(mascota:Mascota){

    let indice = this.cliente.mascotas.indexOf(mascota);
    this.cliente.mascotas.splice(indice,1);

    let m = new Mascota;
    m.nombre = "vacio";
    m.consultas = 0;
    if(this.cliente.mascotas == null || this.cliente.mascotas.length == 0){
      this.cliente.mascotas.push(m);
    }

    
    let c = new Consulta;
    c.nombreMascota = "eliminar";
    if(this.cliente.consultas == null || this.cliente.consultas.length == 0){
      this.cliente.consultas.push(c);
    }

    //Guardo los datos en firebase
    this.datosService.guardarConsulta(this.cliente);
    //Guardo los datos a nivel local
    localStorage.setItem('cliente',JSON.stringify(this.cliente));

    //Elimino la mascota vacia para no mostrarla
    if(this.cliente.mascotas[this.cliente.mascotas.length-1].nombre == "vacio"){
      this.cliente.mascotas.pop();
    }
    
    //Elimino la consulta vacia para no mostrarla
    if(this.cliente.consultas[this.cliente.consultas.length-1].nombreMascota == "eliminar"){
      this.cliente.consultas.pop();
    }


    this.toastr.warning('La mascota se ha eliminado exitosamente','Mascota Eliminada',{
      progressBar: true,
      timeOut: 2000,
      closeButton: true
    });
  }

  verConsulta(consulta:Consulta){
    localStorage.setItem('consulta', JSON.stringify(consulta));
  }

  actualizarCliente(t){
    if(t=="actualizar"){
      this.clienteProvisional = JSON.parse(localStorage.getItem('cliente'));
      this.cliente = this.formatearDatos(this.clienteProvisional);
    }
  }
}

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
import { Factura } from '../models/factura';

import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-registrarconsulta',
  templateUrl: './registrarconsulta.component.html',
  styleUrls: ['./registrarconsulta.component.css']
})
export class RegistrarconsultaComponent implements OnInit {

  //Declaración de variables a utilizar

  //Variables que almacenan los datos de firebase
  clientes:Cliente[];
  servicios:Servicio[];
  medicamentos:Medicamento[];

  //Variables utilizadas para formatear los datos del cliente
  clienteProvisional;
  mascotas:Mascota[];
  consultas:Consulta[];

  //Variables asignadas a la vista
  duiClienteSeleccionado:string;
  clienteSeleccionado:Cliente;
  nombreMascotaSeleccionada:string;
  mascotaSeleccionada:Mascota;
  nombreServicio:string;
  precioServicio:number;
  nombreMedicamento:string;
  precioMedicamento:number;
  consultasMascota:number;
  total:number;
  descuento:number;
  subtotal:number;

  //Variable de la nueva consulta
  nuevaConsulta:Consulta;

  //Variable de la nueva factura
  nuevaFactura:Factura;
  

  enviar = false;
  numeroFactura:number;

  constructor(
    private datosService:DatosService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.clienteSeleccionado = new Cliente;
    this.clienteSeleccionado.nombre = "";
    this.duiClienteSeleccionado = "";
    this.nombreMascotaSeleccionada = "";
    this.consultasMascota = 0;
    this.nombreMedicamento = "";
    this.nombreServicio = "";
    this.precioMedicamento = 0;
    this.precioServicio = 0;
    this.total = 0;
    this.subtotal = 0;
    this.descuento = 0;
    this.nuevaConsulta = new Consulta;
    this.nuevaFactura = new Factura;
    this.numeroFactura = this.getRandomInt(1856, 4786);

    //Obteniendo datos de Firebase
    this.datosService.obtenerDatos("Clientes").snapshotChanges().subscribe(item =>{
      this.clientes = [];
      this.clienteProvisional = new Cliente;
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["DUI"] = element.key;
        this.clienteProvisional = this.formatearDatos(x as Cliente);
        this.clientes.push(this.clienteProvisional as Cliente);
        console.log(this.clientes);
      });
    });

    this.datosService.obtenerDatos("Medicamentos").snapshotChanges().subscribe(item =>{
      this.medicamentos = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["nombre"] = element.key;
        this.medicamentos.push(x as Medicamento);
      });
    });

    this.datosService.obtenerDatos("Servicios").snapshotChanges().subscribe(item =>{
      this.servicios = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["nombre"] = element.key;
        this.servicios.push(x as Servicio);
      });
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
  

  //Obteniendo el objeto del cliente a partir de su nombre seleccionado en el select 
  //y asignandolo a la variable clienteSeleccionado
  seleccionarCliente(){
    
    for (let cliente of this.clientes){
      if(this.duiClienteSeleccionado == cliente.DUI){
        this.clienteSeleccionado = cliente;
        break;
      }
    }

    this.nombreMascotaSeleccionada = "";
    this.nombreMedicamento = "";
    this.nombreServicio = "";
    this.precioMedicamento = 0;
    this.precioServicio = 0;
    this.consultasMascota = 0;
    this.subtotal = 0;
    this.total = 0;
    this.descuento = 0;
  }

  //Obteniendo el descuento a aplicar en base a las citas de la mascota seleccionada
  descuentoAplicado(){
    for (let mascota of this.clienteSeleccionado.mascotas){
      if(mascota.nombre == this.nombreMascotaSeleccionada){
        this.mascotaSeleccionada = mascota;
        this.consultasMascota = mascota.consultas;
        if(mascota.consultas >= 2 && mascota.consultas <= 4){
          this.descuento = 5;
        }else if(mascota.consultas > 4){
          this.descuento = 10;
        }
        break;
      }
    }
    this.subtotal = 0;
    this.total = 0;
    this.precioMedicamento = 0;
    this.precioServicio = 0;
  }

  //Obteniendo el medicamento seleccionado y calculando costos tomando en cuenta el descuento.
  calcularCostos(){
    for(let servicio of this.servicios){
      if(servicio.nombre == this.nombreServicio){
        this.precioServicio = servicio.precio;
      }
    }
    for(let medicamento of this.medicamentos){
      if(medicamento.nombre == this.nombreMedicamento){
        this.precioMedicamento = medicamento.precio;
      }
    }
    this.precioMedicamento = Number(this.precioMedicamento);
    this.precioServicio = Number(this.precioServicio);
    this.subtotal = this.precioMedicamento + this.precioServicio;
    this.total = this.subtotal - this.subtotal*(this.descuento/100);
  }

  //Se guardan los datos de la cita
  //Se incrementa por 1 la cantidad de citas de la mascota
  //Se almacena el servicio seleccionado en el atributo ultimoServicio de la mascota
  //Se incrementa el numero de la factura
  registrarConsulta(){

    //Lleno el objeto de la factura
    this.nuevaFactura.numeroFactura = this.numeroFactura;
    this.nuevaFactura.duiCliente = this.duiClienteSeleccionado;
    this.nuevaFactura.nombreCliente = this.clienteSeleccionado.nombre;
    this.nuevaFactura.nombreMascota = this.nombreMascotaSeleccionada;
    this.nuevaFactura.servicio = this.nombreServicio;
    this.nuevaFactura.medicamento = this.nombreMedicamento;
    this.nuevaFactura.descuento = this.descuento;
    this.nuevaFactura.total = this.total;

    //Lleno el objeto de la nueva consulta
    this.nuevaConsulta.nombreMascota = this.nombreMascotaSeleccionada;
    this.nuevaConsulta.medicamento = this.nombreMedicamento;
    this.nuevaConsulta.servicio = this.nombreServicio;
    this.nuevaConsulta.descuento = this.descuento;
    this.nuevaConsulta.subtotal = this.subtotal;
    this.nuevaConsulta.total = this.total;
    this.nuevaConsulta.factura = this.nuevaFactura;
    console.log(this.nuevaConsulta);



    //Incremento el numero de consultas de la mascota seleccionada
    for (let cliente of this.clientes){
      if(cliente.DUI == this.duiClienteSeleccionado){
        for(let mascota of cliente.mascotas){
          if(mascota.nombre == this.nombreMascotaSeleccionada){
            mascota.consultas++;
            break;
          }
        }

        cliente.consultas.push(this.nuevaConsulta);
        this.datosService.guardarConsulta(cliente);
        break;
      } 
    }

    this.toastr.success('Consulta registrada', 'La nueva consulta se ha registrado exitosamente',{
      progressBar: true,
      timeOut: 2000,
      closeButton: true
    });

    

    
    this.numeroFactura++;
    this.enviar = true;
  }

  //Función para vaciar los campos del formulario y eliminar el valor de algunas
  limpiarFormulario(){
    this.enviar = false;

    this.duiClienteSeleccionado = "";
    this.clienteSeleccionado.nombre = "";
    this.nombreMascotaSeleccionada = "";
    this.nombreMedicamento = "";
    this.nombreServicio = "";
    this.precioMedicamento = 0;
    this.precioServicio = 0;
    this.consultasMascota = 0;
    this.subtotal = 0;
    this.total = 0;
    this.descuento = 0;
  }

  descargar(){
    var element = document.getElementById('facturaPDF');
    html2canvas(element).then((canvas) => {
      console.log(canvas);
      var imgData = canvas.toDataURL('image/png');
      var doc = new jspdf.jsPDF();
      var imgHeight = canvas.height * 104 / canvas.width;
      doc.addImage(imgData,canvas.width/5.5,0,100,200);
      doc.save("factura"+this.numeroFactura+".pdf");
    })
  }

  //Función para obtener un numero aleatorio entre un rango que se utiliza para el número de la factura
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

}

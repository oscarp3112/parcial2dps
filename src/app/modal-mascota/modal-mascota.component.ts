import { Component, OnInit, Output } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Mascota } from '../models/mascota';
import { DatosService } from '../services/datos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-mascota',
  templateUrl: './modal-mascota.component.html',
  styleUrls: ['./modal-mascota.component.css']
})
export class ModalMascotaComponent {

  cliente:Cliente;
  nombreMascota:string = "";
  closeResult = '';
  regexp:RegExp = /^[a-zA-Z ]*$/g;
  nombreValido:boolean = true;

  @Output() actualizar = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private servicioDatos:DatosService,
    private toastr:ToastrService
    ) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = ``;
    }, (reason) => {
      this.closeResult = ``;
    });
    this.cliente = JSON.parse(localStorage.getItem('cliente')) as Cliente;
    this.nombreMascota = "";
    this.nombreValido = true;
  }

  agregarMascota(){
    //Formate el objeto del cliente y la mascota nueva
    if(this.cliente.mascotas[0].nombre == "vacio"){
      this.cliente.mascotas.pop();
    }
    let m = new Mascota;
    m.nombre = this.nombreMascota;
    m.consultas = 0;
    this.cliente.mascotas.push(m);

    //Envio la mascota nueva a la base de datos
    this.servicioDatos.agregarCliente(this.cliente.DUI, this.cliente);

    //Almaceno el cambio de la mascota en el local Storage
    localStorage.setItem('cliente',JSON.stringify(this.cliente));
    this.actualizar.emit("actualizar");

    //Elimino el nombre de la mascota del input
    this.nombreMascota = "";

    this.toastr.success('La nueva mascota se ha registrado exitosamente','Mascota Registrada',{
      progressBar: true,
      timeOut: 2000,
      closeButton: true
    });
  }

  validarNombre(nombre:string){
    this.nombreValido = this.regexp.test(nombre);
    
    if(this.nombreValido){
      this.agregarMascota();
    }
  }

  reiniciar(nombre:string){
    if(nombre == ""){
      this.nombreValido = true;
    }
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}

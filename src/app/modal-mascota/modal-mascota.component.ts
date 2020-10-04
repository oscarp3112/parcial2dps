import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from '../models/cliente';
import { Mascota } from '../models/mascota';
import { DatosService } from '../services/datos.service';

@Component({
  selector: 'app-modal-mascota',
  templateUrl: './modal-mascota.component.html',
  styleUrls: ['./modal-mascota.component.css']
})
export class ModalMascotaComponent {

  cliente:Cliente;
  nombreMascota:string = "";
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private servicioDatos:DatosService
    ) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = ``;
    }, (reason) => {
      this.closeResult = ``;
    });
    this.cliente = JSON.parse(localStorage.getItem('cliente')) as Cliente;
    this.nombreMascota = "";
  }

  agregarMascota(){
    if(this.cliente.mascotas[0].nombre = "vacio"){
      this.cliente.mascotas.pop();
    }
    let m = new Mascota;
    m.nombre = this.nombreMascota;
    m.consultas = 0;
    console.log(m);
    this.cliente.mascotas.push(m);
    console.log(this.cliente);
    this.servicioDatos.agregarCliente(this.cliente.DUI, this.cliente);
    this.nombreMascota = "";
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

import { Component, OnInit } from '@angular/core';
import { Consulta } from '../models/consulta';
import { Factura } from '../models/factura';

@Component({
  selector: 'app-ver-consulta',
  templateUrl: './ver-consulta.component.html',
  styleUrls: ['./ver-consulta.component.css']
})
export class VerConsultaComponent implements OnInit {

  consulta:Consulta;
  factura:Factura;

  constructor() { }

  ngOnInit(): void {
    this.consulta = new Consulta;
    this.factura = new Factura;
    this.consulta = JSON.parse(localStorage.getItem('consulta'));
    
    this.factura = this.consulta.factura;

    console.log(this.consulta);
  }

}

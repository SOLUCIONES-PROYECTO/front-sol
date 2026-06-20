import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { forkJoin } from 'rxjs';

import { DocSalida } from '../../../core/class/models/docsalida';
import { DetalleSalida } from '../../../core/class/models/detallesalida';
import { AreaUsoInterno } from '../../../core/class/models/areusointerno';
import { Producto } from '../../../core/class/models/productos';
import { TipoDocSalida } from '../../../core/class/models/tipodocsalida';
import { MetodoPago } from '../../../core/class/models/metodopago';
import { EstadoPago } from '../../../core/class/models/estadopago';

import { DocSalidaService } from '../../../core/services/docSalida.service';
import { DetalleSalidaService } from '../../../core/services/detalleSalida.service';
import { AreaUsoInternoService } from '../../../core/services/areaUsoInterno.service';
import { ProductoService } from '../../../core/services/producto.service';
import { TipoDocSalidaService } from '../../../core/services/tipoDocSalida.service';
import { MetodoPagoService } from '../../../core/services/metodoPago.service';
import { EstadoPagoService } from '../../../core/services/estadoPago.service';

@Component({
  selector: 'app-egresos-form',
  standalone: false,
  templateUrl: './egresos-form.component.html',
  styleUrl: './egresos-form.component.css',
})

export class EgresosFormComponent {

  docSalida: DocSalida= new DocSalida();

  modoEdicion = false;
  modoVista = false;
  idDocSalida: number | null = null;

  areaUsoInterno: AreaUsoInterno[] = [];
  tiposDocSalida: TipoDocSalida[] = [];
  metodosPago: MetodoPago[] = [];
  estadosPago: EstadoPago[] = [];

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private docSalidaService: DocSalidaService,
    private tipoDocSalidaService: TipoDocSalidaService,
    private areUsoInternoService: AreaUsoInternoService,
    private metodoPagoService: MetodoPagoService,
    private estadoPagoService: EstadoPagoService,

  
  
  ) {}

  Regresar(): void {
    this.router.navigate(['/egresos']);
  }
}
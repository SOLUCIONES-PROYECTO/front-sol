import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AlmacenFormComponent } from './almacen-form.component';
import { ProductoService } from '../../../core/services/producto.service';
import { DetalleEntradaService } from '../../../core/services/detalleEntrada.service';
import { Router, ActivatedRoute } from '@angular/router';

describe('AlmacenFormComponent', () => {
  let component: AlmacenFormComponent;
  let fixture: ComponentFixture<AlmacenFormComponent>;

  beforeEach(async () => {
    const productoServiceStub = {
      obtenerProducto: jasmine.createSpy('obtenerProducto').and.returnValue(of({ stockActual: 10, stockMinimo: 2 })),
    };

    const detalleEntradaServiceStub = {
      listar: jasmine.createSpy('listar').and.returnValue(of([
        { idProducto: 10, fechaVencimiento: new Date(''), codigoLote: 'L999', loteProducto: 'L999' },
        { idProducto: 10, fechaVencimiento: new Date('2026-07-15'), codigoLote: 'L001', loteProducto: 'L001' },
      ])),
    };

    await TestBed.configureTestingModule({
      declarations: [AlmacenFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '10' } } } },
        { provide: ProductoService, useValue: productoServiceStub },
        { provide: DetalleEntradaService, useValue: detalleEntradaServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlmacenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe seleccionar automáticamente el lote con vencimiento más próximo', () => {
    component.cargarLotes(10);

    expect(component.loteSeleccionado?.codigoLote).toBe('L001');
    expect(component.fechaVencimientoMasProxima).toEqual(new Date('2026-07-15'));
  });
});

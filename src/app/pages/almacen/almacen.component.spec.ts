import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

import { AlmacenComponent } from './almacen.component';
import { ProductoService } from '../../core/services/producto.service';
import { DetalleEntradaService } from '../../core/services/detalleEntrada.service';
import { SidebarCounterService } from '../../shared/services/sidebar-counter.service';
import { Router } from '@angular/router';

describe('AlmacenComponent', () => {
  let component: AlmacenComponent;
  let fixture: ComponentFixture<AlmacenComponent>;

  beforeEach(async () => {
    const productoServiceStub = {
      listarProductos: jasmine.createSpy('listarProductos').and.returnValue(of([
        { idproducto: 1, nombre: 'Producto A', categoria: 'Abarrotes', stockActual: 10, stockMinimo: 2, imagen: '' },
        { idproducto: 2, nombre: 'Producto B', categoria: 'Lácteos', stockActual: 5, stockMinimo: 1, imagen: '' },
        { idproducto: 3, nombre: 'Producto C', categoria: 'Limpieza', stockActual: 8, stockMinimo: 4, imagen: '' },
      ])),
    };

    const detalleEntradaServiceStub = {
      listar: jasmine.createSpy('listar').and.returnValue(of([
        { idProducto: 3, fechaVencimiento: new Date('2026-07-30') },
        { idProducto: 1, fechaVencimiento: new Date('2026-07-15') },
        { idProducto: 2, fechaVencimiento: new Date('2026-07-20') },
      ])),
    };

    const sidebarCounterStub = {
      almacenCount: new BehaviorSubject(0),
    };

    await TestBed.configureTestingModule({
      declarations: [AlmacenComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ProductoService, useValue: productoServiceStub },
        { provide: DetalleEntradaService, useValue: detalleEntradaServiceStub },
        { provide: SidebarCounterService, useValue: sidebarCounterStub },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe ordenar los productos por la fecha de vencimiento FEFO', () => {
    component.cargarAlmacen();

    expect(component.data.map((item) => item.producto)).toEqual(['Producto A', 'Producto B', 'Producto C']);
  });
});

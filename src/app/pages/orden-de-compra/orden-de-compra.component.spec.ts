import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDeCompraComponent } from './orden-de-compra.component';

describe('OrdenDeCompraComponent', () => {
  let component: OrdenDeCompraComponent;
  let fixture: ComponentFixture<OrdenDeCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdenDeCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenDeCompraComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

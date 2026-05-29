import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraComponent } from './orden-compra';

describe('OrdenCompraComponent', () => {
  let component: OrdenCompraComponent;
  let fixture: ComponentFixture<OrdenCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdenCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenCompraComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

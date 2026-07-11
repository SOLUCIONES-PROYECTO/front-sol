import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesHistorial } from './clientes-historial';

describe('ClientesHistorial', () => {
  let component: ClientesHistorial;
  let fixture: ComponentFixture<ClientesHistorial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientesHistorial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesHistorial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

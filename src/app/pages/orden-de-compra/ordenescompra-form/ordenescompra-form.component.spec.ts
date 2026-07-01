import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenesCompraFormComponent } from './ordenescompra-form.component';

describe('OrdenescompraFormComponent', () => {
  let component: OrdenesCompraFormComponent;
  let fixture: ComponentFixture<OrdenesCompraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdenesCompraFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenesCompraFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

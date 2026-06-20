import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosComponent } from './ingresos.component';

describe('IngresosComponent', () => {
  let component: IngresosComponent;
  let fixture: ComponentFixture<IngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

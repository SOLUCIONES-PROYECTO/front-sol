import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosFormComponent } from './ingresos-form.component';

describe('IngresosFormComponent', () => {
  let component: IngresosFormComponent;
  let fixture: ComponentFixture<IngresosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IngresosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresosFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

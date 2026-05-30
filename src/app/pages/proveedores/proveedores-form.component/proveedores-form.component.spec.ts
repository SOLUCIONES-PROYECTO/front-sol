import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresFormComponent } from './proveedores-form.component';

describe('ProveedoresFormComponent', () => {
  let component: ProveedoresFormComponent;
  let fixture: ComponentFixture<ProveedoresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedoresFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

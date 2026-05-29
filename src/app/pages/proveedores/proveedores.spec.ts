import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresComponent } from './proveedores';

describe('ProveedoresComponent', () => {
  let component: ProveedoresComponent;
  let fixture: ComponentFixture<ProveedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

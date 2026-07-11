import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendedorDashboardComponent } from './vendedor-dashboard.component';

describe('VendedorDashboardComponent', () => {
  let component: VendedorDashboardComponent;
  let fixture: ComponentFixture<VendedorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendedorDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendedorDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

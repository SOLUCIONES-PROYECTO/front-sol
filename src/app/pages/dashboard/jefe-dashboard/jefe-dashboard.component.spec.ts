import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeDashboardComponent } from './jefe-dashboard.component';

describe('JefeDashboardComponent', () => {
  let component: JefeDashboardComponent;
  let fixture: ComponentFixture<JefeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JefeDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JefeDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

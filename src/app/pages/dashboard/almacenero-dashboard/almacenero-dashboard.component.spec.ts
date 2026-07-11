import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmaceneroDashboard } from './almacenero-dashboard.component';

describe('AlmaceneroDashboard', () => {
  let component: AlmaceneroDashboard;
  let fixture: ComponentFixture<AlmaceneroDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlmaceneroDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmaceneroDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

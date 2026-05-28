import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgresosComponent } from './egresos.component';

describe('EgresosComponent', () => {
  let component: EgresosComponent;
  let fixture: ComponentFixture<EgresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EgresosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgresosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

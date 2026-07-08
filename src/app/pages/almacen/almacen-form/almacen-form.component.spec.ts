import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenFormComponent } from './almacen-form.component';

describe('AlmacenFormComponent', () => {
  let component: AlmacenFormComponent;
  let fixture: ComponentFixture<AlmacenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlmacenFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

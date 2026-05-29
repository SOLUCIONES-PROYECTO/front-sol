import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenComponent } from './almacen';

describe('AlmacenComponent', () => {
  let component: AlmacenComponent;
  let fixture: ComponentFixture<AlmacenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlmacenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlmacenComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesGlobalesComponent } from './ajustes-globales.component';

describe('AjustesGlobalesComponent', () => {
  let component: AjustesGlobalesComponent;
  let fixture: ComponentFixture<AjustesGlobalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjustesGlobalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustesGlobalesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

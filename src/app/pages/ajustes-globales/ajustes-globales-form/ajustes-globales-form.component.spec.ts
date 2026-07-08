import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesGlobalesFormComponent } from './ajustes-globales-form.component';

describe('AjustesGlobalesFormComponent', () => {
  let component: AjustesGlobalesFormComponent;
  let fixture: ComponentFixture<AjustesGlobalesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjustesGlobalesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjustesGlobalesFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

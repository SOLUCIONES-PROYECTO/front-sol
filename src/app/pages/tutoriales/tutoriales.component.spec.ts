import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialesComponent } from './tutoriales.component';

describe('TutorialesComponent', () => {
  let component: TutorialesComponent;
  let fixture: ComponentFixture<TutorialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TutorialesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

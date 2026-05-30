import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EgresosFormComponent } from './egresos-form.component';

describe('EgresosFormComponent', () => {
  let component: EgresosFormComponent;
  let fixture: ComponentFixture<EgresosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EgresosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgresosFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

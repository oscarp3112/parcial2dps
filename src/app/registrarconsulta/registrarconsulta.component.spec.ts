import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarconsultaComponent } from './registrarconsulta.component';

describe('RegistrarconsultaComponent', () => {
  let component: RegistrarconsultaComponent;
  let fixture: ComponentFixture<RegistrarconsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarconsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarconsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
